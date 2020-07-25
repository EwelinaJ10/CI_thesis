//script per scaricare i file yaml di cui i percorsi sono scritti in un file apposito, e metterli in una cartella

const http = require('https');
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

var instream = fs.createReadStream('yamls_paths_10.txt');
var outstream = new stream;
var urls = []

const directory_yamls = './yamls/';
const directory_github = './github_yamls/';
const directory_circle = './circle_yamls/';

var rl = readline.createInterface(instream, outstream);

//leggo i percorsi nel file e li metto nell'array urls
rl.on('line', function(line) {

    urls.push(line)
})
rl.on('close', async function() {

    //per ogni percorso, mi prendo solo il nome del file e lo metto nella sottocartella yamls
    for(let i = 0; i<urls.length; i++){

        var filename =  urls[i].split('/').pop();
        if(urls[i].includes(".circleci/config.yml") == true){
            const file = fs.createWriteStream(directory_circle + filename);
            const request = http.get(urls[i], function(response) {
                response.pipe(file);
    });
        }
        else if (urls[i].includes(".github/workflows") == true){
            const file = fs.createWriteStream(directory_github + filename);
            const request = http.get(urls[i], function(response) {
                response.pipe(file);
    });
        }
        else {
            const file = fs.createWriteStream(directory_yamls + filename);
            const request = http.get(urls[i], function(response) {
                response.pipe(file);
    });
        }
        
        

       
    }
});

