/*script that reads all the repos found previously from the "repo_names.txt", 
and checks if they contain yaml files (if yes, saves their paths in "yamls_paths.txt" file) */
 
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const fetch = require("node-fetch");
const api_url = "https://api.github.com";

var number_of_pages
const repos_names = []

const headers ={
    "Authorization" : 'Token d74b7a6d1d63d0888b78ba68a7b2f00ed57bb590'
}
//si riferisce al data ranges da 2018 a 2020, progetti con più di 100 stelle
const yaml_paths = fs.createWriteStream('yaml_paths_2018-2020_100stars.txt');
const repos_with_yaml = fs.createWriteStream('repos_with_yaml_2018-2020__100stars.txt');
const repos_with_travis = fs.createWriteStream('repos_with_travis.txt');
const repos_with_circle = fs.createWriteStream('repos_with_circle.txt');
const repos_with_github = fs.createWriteStream('repos_with_github.txt');
const repos_with_appveyor = fs.createWriteStream('repos_with_appveyor.txt');
const repos_with_wercker = fs.createWriteStream('repos_with_wercker.txt');
const yaml = (api_url + "/search/code?q=language:yaml+extension:yml+repo:");


//main function, reading from repo_names file, and passing each range to the getYamls function
function main(url){

    var instream = fs.createReadStream('repos_100stars_2018-2020.txt');
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);
    rl.on('line', function(line) {
        repos_names.push(line)
    })
    rl.on('close', async function() {

        for(let i = 0; i<repos_names.length; i++){
            console.log(i)
            await getYamls(repos_names[i], url)
        }
    });       
}
//function querying repos for the yaml files 
async function getYamls(line, url){

    var yaml_url = url + line + "&per_page=100"
    const yaml_response = await fetch(yaml_url,{
        "method" : "GET",
        "headers": headers,
    })
    .then( blob => blob.json() )
    .then(async function( data ) {
        const count = data.total_count
        total_yamls += count
        number_of_pages = Math.ceil(count / 100)

        if(number_of_pages>0){
           
            repos_with_yaml.write(`${line} \n`)
              
            if(number_of_pages>10){
                number_of_pages = 10
            }
            await loadMore(number_of_pages, yaml_url, line)
            }  
        })
        .catch(function(err) {
            console.log(err);
        });
}
//function to load all the pages (max 10), and writing the download urls of the found yaml files in "yamls_paths.txt" 
async function loadMore(pages, url, line) {
    
    for ( let i = 1; i < pages +1; i++ ) {
        await fetch( url + '&page=' + i, {
            "method" : "GET",
            "headers": headers
        } )
            .then( res => res.json() )
            .then( function( data ) {
                data.items.forEach(async element => {
                    let file_name = element.name
        
                    let url_response = await fetch(element.url,
                        {
                        "method" : "GET",
                        "headers": headers
                    })
                 
                    let url_result = await url_response.json()
                    let yaml_file_download_url = url_result.download_url;
                    if(yaml_file_download_url.includes(".travis.yml")){
                    try{
                        yaml_paths.write(`${yaml_file_download_url}\n`) 
                        repos_with_travis.write((`${line} \n`))
                    }
                    catch(e){
                        console.log(e)
                   
                        }
                    
                    }
                    else if(yaml_file_download_url.includes(".github/workflows")){
                        try{
                            yaml_paths.write(`${yaml_file_download_url}\n`) 
                            repos_with_github.write((`${line} \n`))
                        }
                        catch(e){
                            console.log(e)
                       
                            }
                        
                        }
                        else if(yaml_file_download_url.includes("appveyor")){
                            try{
                                yaml_paths.write(`${yaml_file_download_url}\n`) 
                                repos_with_appveyor.write((`${line} \n`))
                            }
                            catch(e){
                                console.log(e)
                           
                                }
                            
                            }
                            else if(yaml_file_download_url.includes("wercker")){
                                try{
                                    yaml_paths.write(`${yaml_file_download_url}\n`) 
                                    repos_with_wercker.write((`${line} \n`))
                                }
                                catch(e){
                                    console.log(e)
                               
                                    }
                                
                                }
                                else if(yaml_file_download_url.includes(".circleci/config.yml")){
                                    try{
                                        yaml_paths.write(`${yaml_file_download_url}\n`) 
                                        repos_with_circle.write((`${line} \n`))
                                    }
                                    catch(e){
                                        console.log(e)
                                   
                                        }
                                    
                                    }
                    
                       
                     
                })               
            })
            .catch(function(err) {
                console.log(err);
              });
             
    }
}

main(yaml)