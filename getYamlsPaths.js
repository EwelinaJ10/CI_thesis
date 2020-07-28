/*script that reads all the repos found previously from the "repo_names.txt", 
and checks if they contain yaml files (if yes, saves their paths in "yamls_paths.txt" file) */
 
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const fetch = require("node-fetch");
const api_url = "https://api.github.com";

var number_of_pages
var total_yamls
//const travis_paths = fs.createWriteStream('travis_paths.txt');
//const repos_with_travis = fs.createWriteStream('repos_with_travis.txt');
const repos_names = []

const headers ={
    "Authorization" : 'Token d74b7a6d1d63d0888b78ba68a7b2f00ed57bb590'
}
const yaml_paths = fs.createWriteStream('yaml_paths.txt');
const repos_with_yaml = fs.createWriteStream('repos_with_yaml.txt');

//const circle_paths = fs.createWriteStream('circle_paths.txt');
//const repos_with_circle = fs.createWriteStream('repos_with_circle.txt');

//const appveyor_paths = fs.createWriteStream('appveyor_paths.txt');
//const repos_with_appveyor = fs.createWriteStream('repos_with_appveyor.txt');
//const yaml_circle = (api_url + "/search/code?q=language+script+language:yaml+extension:yml+travis in:name+repo:");
const yaml = (api_url + "/search/code?q=language:yaml+extension:yml+repo:");
const yaml_github = (api_url + "/search/code?q=jobs+name+on+language:yaml+extension:yml+.github/workflows+in:url+repo:");
//const yaml_appveyor = (api_url + "/search/code?q=build+language:yaml+extension:yml+appveyor in:name+repo:");
const yaml_wercker = (api_url + "/search/code?q=build+script+steps+language:yaml+extension:yml+wercker in:name+repo:");
//main function, reading from repo_names file, and passing each range to the getYamls function
function main(url, file_paths, file_repo){

    var instream = fs.createReadStream('repo_more_2000_stars_from2017.txt');
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);
    rl.on('line', function(line) {
        repos_names.push(line)
    })
    rl.on('close', async function() {

        for(let i = 0; i<repos_names.length; i++){
            console.log(i)
            await getYamls(repos_names[i], url, file_paths, file_repo)
        }
    });       
}
//function querying repos for the yaml files 
async function getYamls(line, url, file_paths, file_repo){

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
           
            file_repo.write(`${line} \n`)
              
            if(number_of_pages>10){
                number_of_pages = 10
            }
            await loadMore(number_of_pages, yaml_url, file_paths)
            }  
        })
        .catch(function(err) {
            console.log(err);
        });
}
//function to load all the pages (max 10), and writing the download urls of the found yaml files in "yamls_paths.txt" 
async function loadMore(pages, url,file_paths) {
    
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
                    try{
                        file_paths.write(`${yaml_file_download_url}\n`) 
                    }
                    catch(e){
                        console.log(e)
                    }
                   
                })               
            })
            .catch(function(err) {
                console.log(err);
              });
             
    }
}

main(yaml, yaml_paths, repos_with_yaml)