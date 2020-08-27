//script che analizza il numero degli steps presenti nei jobs 

const path = require('path');
const fs = require('fs');
const yaml = require ("yaml");

//leggo la cartella 
const directoryPath = path.join(__dirname, 'github_yamls');
const directory = './github_yamls/';

const steps_number = fs.createWriteStream('jobs_steps_number.txt');

const defaultOptions = {
   
    maxAliasCount: -1,
   
  }

fs.readdir(directoryPath, function (err, files) {
   
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(async function (file_name) {
       await getSteps(file_name);
    });
});

 function getSteps(file_name){
      
       try{
        var file = fs.readFileSync(directory +  file_name, 'utf8')
        var yaml_file = yaml.parse(file, defaultOptions)

        yaml2array(yaml_file.jobs).forEach(function(job_id, i){
                const n_steps = yaml2array(job_id.steps).length
                var job_name = job_id.name
                steps_number.write((`${n_steps},${Object.keys(yaml_file.jobs)[i]}, ${job_name}, ${file_name} \n`))
            })
    }                 
    catch(err){
        console.log(err + " " + file_name);    
    }      
}

function getRows(file_name){
      
        try{
        
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