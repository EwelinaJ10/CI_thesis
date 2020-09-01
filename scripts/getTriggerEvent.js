const path = require('path');
const fs = require('fs');
const yaml = require ("yaml")
const stream = require('stream');
const readline = require('readline');

//leggo la cartella 
const directoryPath = path.join(__dirname, 'github_yamls');
const directory = './github_yamls/';

var instream = fs.createReadStream('files_with_1job.txt');
var outstream = new stream;
var files = []

var rl = readline.createInterface(instream, outstream);

const trigger_events = fs.createWriteStream('trigger_events_prova1.txt');

//leggo i percorsi nel file e li metto nell'array urls
rl.on('line', function(line) {

    files.push(line)
})
rl.on('close', function() {

    fs.readdir(directoryPath, function (err, files) {
   
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
       //leggo tutti i file presenti all'interno della cartella 
        files.forEach( function (file_name) {

            //if(files.includes(file_name)){
                analyze(file_name);
            //}
        });
    });
    
    });


const defaultOptions = {
   
    maxAliasCount: -1,
   
  }

 function analyze(file_name){
       //apro il file e faccio il parsing yaml
       try{
        var file = fs.readFileSync(directory +  file_name, 'utf8')
        var yaml_file = yaml.parse(file, defaultOptions)
        
        for (let i=0; i< yaml2array(yaml_file.on).length; i++){
            {
                if(Object.keys(yaml_file.on)[0] == 0){
                    trigger_events.write((`${yaml2array(yaml_file.on)[i]}, ${file_name} \n`))
                }
                else{
                trigger_events.write((`${Object.keys(yaml_file.on)[i]}, ${file_name} \n`))
                }
            }
        }
        
    }

    catch(err){
        console.log(err + " " + file_name);
    }
    
}

//converto da yaml ad array
function yaml2array(yaml){
    var result = [];
    var keys = Object.keys(yaml);
    keys.forEach(function(key){
        result.push(yaml[key]);
    });
    return result;
}
