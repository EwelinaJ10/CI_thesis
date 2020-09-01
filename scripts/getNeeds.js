//script che analizza il numero dei "needs" presenti nei jobs, ovvero quante volte compare la sequenzialità 

const path = require('path');
const fs = require('fs');
const yaml = require ("yaml");

//leggo la cartella 
const directoryPath = path.join('yamls/github_yamls');
const directory = 'yamls/github_yamls/';

const needs_jobs = fs.createWriteStream('jobs_needs.txt');

const defaultOptions = {
   
    maxAliasCount: -1,
   
  }

fs.readdir(directoryPath, function (err, files) {
   
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(async function (file_name) {
       await getNeeds(file_name);
    });
});

 function getNeeds(file_name){
      
       try{
        var file = fs.readFileSync(directory +  file_name, 'utf8')
        var yaml_file = yaml.parse(file, defaultOptions)
        var n_jobs = yaml2array(yaml_file.jobs).length
        var n_needs = 0
        yaml2array(yaml_file.jobs).forEach(function(job_id, i){
                if(job_id.needs!=null){
                    n_needs++;
                }
            
            })
            needs_jobs.write((`${n_needs},${n_jobs}, ${file_name} \n`))
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