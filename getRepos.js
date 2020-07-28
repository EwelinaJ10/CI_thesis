/*querying for the repositories having more than 2000 stars, and writing their names in "repo_more_2000_stars_names.txt" file*/

const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const fetch = require("node-fetch");

const api_url = "https://api.github.com";

const headers ={
    "Authorization" : 'Token d74b7a6d1d63d0888b78ba68a7b2f00ed57bb590'
}


const repos = (api_url + "/search/repositories?q=stars:>=2000+created:");
const repos_names = fs.createWriteStream('repo_more_2000_stars_from2017.txt');
var ranges = []
var number_of_pages

//main function, reading from date_ranges file, and passing each range to the getRepos function
function main(url){

    var instream = fs.createReadStream('date_ranges_2000.txt');
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);
    console.log("start")
    rl.on('line', function(line) {

        ranges.push(line)
    })
    rl.on('close', async function() {

        for(let i = 0; i<ranges.length; i++){
            console.log(ranges[i])
            await getRepos(ranges[i], url)
        }
    });
}  

//function to load all the pages (max 10), and writing the names of the found repos in "repo_names.txt" 
async function loadMore(pages, url) {
//console.log("ciao");
    for ( let i = 1; i < pages +1; i++ ) {
        const response = await fetch( url + '&page=' + i, {
            "method" : "GET",
            "headers": headers
        })
        .then( blob => blob.json() )
        .then( function( data ) {
            data.items.forEach(async element => {
            const repo_name = element.full_name
            try{
                repos_names.write(`${repo_name}\n`)
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

//function querying for the repos for each range
async function getRepos(line, url){

    let repos_url = url + line + "&per_page=100"
    const yaml_response = await fetch(repos_url,
      {
      "method" : "GET",
      "headers": headers
  })
  .then( blob => blob.json() )
  .then( async function( data ) {
      const count = data.total_count
    console.log(count)
      number_of_pages = Math.ceil(count / 100)
      if(number_of_pages>10){
          number_of_pages = 10
    }
    await loadMore(number_of_pages, repos_url)
})
.catch(function(err) {
    console.log(err);
  });
}


main(repos)