//script per scaricare i file yaml di cui i percorsi sono scritti in un file apposito, e metterli in una cartella

const http = require('https');
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const axios = require('axios');

var instream = fs.createReadStream('yaml_paths_2018-2020_100stars.txt');
var outstream = new stream;
var urls = []
const directory_yamls = './yamls/';
const directory_github = './github_yamls/';
const directory_circle = './circle_yamls/';
const directory_travis = './travis_yamls/';
const directory_appveyor = './appveyor_yamls/';

var rl = readline.createInterface(instream, outstream);

//leggo i percorsi nel file e li metto nell'array urls
rl.on('line', function(line) {

    urls.push(line)
})
rl.on('close', async function() {
   
    //per ogni percorso, mi prendo solo il nome del file e lo metto nella sottocartella yamls
    for(let i = 0; i<urls.length; i++){
        console.log(i)
        await download(urls[i], i)
    }});

async function download(url, i){

    try{
        var filename =  url.split('/').pop();
        
        
        if(url.includes(".circleci/config.yml") == true){
            const file = fs.createWriteStream(directory_circle + (i +'_'+ filename));
            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream'
              })
              try{
                response.data.pipe(file);
                  }
                  catch(err){
                      console.log(err)
                  }

    
        }
        else if (url.includes(".github/workflows") == true){

            const file = fs.createWriteStream(directory_github + (i+'_'+filename));
            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream'
              })
              try{
            response.data.pipe(file);
              }
              catch(err){
                  console.log(err)
              }
                
        }
        else if (url.includes("travis") == true){

            const file = fs.createWriteStream(directory_travis + (i+'_'+filename));
            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream'
              })
              try{
            response.data.pipe(file);
              }
              catch(err){
                  console.log(err)
              }
                
        }
        else if (url.includes("appveyor") == true){

            const file = fs.createWriteStream(directory_appveyor + (i+'_'+filename));
            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream'
              })
              try{
            response.data.pipe(file);
              }
              catch(err){
                  console.log(err)
              }
                
        }
        else{
            const file = fs.createWriteStream(directory_yamls + (i + '_' + filename));
            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream'
              })
              try{
                response.data.pipe(file);
                  }
                  catch(err){
                      console.log(err)
                  }
        }
       
    }
    catch (error) {
        console.log(error);
      }
}
