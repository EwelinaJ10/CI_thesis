const path = require('path');
const fs = require('fs');
const yaml = require ("yaml");

//leggo la cartella 
const directoryPath = path.join(__dirname, '/github_yamls');
const directory = './github_yamls/';

const rows_per_job = fs.createWriteStream('rows_per_job.txt');
var rows_of_comments = []
const defaultOptions = {
   
    maxAliasCount: -1,
   
  }

fs.readdir(directoryPath, function (err, files) {
   
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(async function (file_name) {
       await getRows(file_name);
    });
});

 function getRows(file_name){
      
       try{
        rows_per_job.write((`${file_name}, `))   
           var indexes = []
           var num_rows_per_job = []
           fileBuffer =  fs.readFileSync(directory +  file_name, 'utf8');
           var yaml_file = yaml.parse(fileBuffer, defaultOptions)
           to_string = fileBuffer.toString();
           split_lines = to_string.split("\n");
           yaml2array(yaml_file.jobs).forEach(function(job_id, i){
            //jobs_index.write((`${split_lines.indexOf("  " + Object.keys(yaml_file.jobs)[i] + ":")+1}, `))
            indexes.push(split_lines.indexOf("  " + Object.keys(yaml_file.jobs)[i] + ":")+1)
        })
        var size = split_lines.length
        //jobs_index.write((`${split_lines.length-1}, `))
        indexes.push(split_lines.length-1)
        indexes.forEach(function(element, i){
            if(i<indexes.length-1){
                num_rows_per_job.push(indexes[i+1]-indexes[i])
            }
        })
        num_rows_per_job.forEach(function(job_id, i){
            if(i==num_rows_per_job.length-1){
                rows_per_job.write((`${num_rows_per_job[i]} \n`))
            }
            else{
                rows_per_job.write((`${num_rows_per_job[i]}, `))
            }
        }) 
    }                 
    catch(err){
        console.log(err + " " + file_name);    
    }      
}
function yaml2array(yaml){
    var result = [];
    var keys = Object.keys(yaml);
    keys.forEach(function(key){
        result.push(yaml[key]);
    });
    return result;
}