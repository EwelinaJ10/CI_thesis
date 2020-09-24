const path = require('path');
const fs = require('fs');
const yaml = require ("yaml");

//leggo la cartella 
const directoryPath = path.join('github_yamls');
const directory = './github_yamls/';

const paths_file = fs.createWriteStream('paths.txt');

const defaultOptions = {
   
    maxAliasCount: -1,
   
  }

fs.readdir(directoryPath, function (err, files) {
   
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(async function (file_name) {
       await getPaths(file_name);
    });
});

 function getPaths(file_name){
      
    try{
        var paths = 0
        var indexes = []
        fileBuffer =  fs.readFileSync(directory +  file_name, 'utf8');
        to_string = fileBuffer.toString();
        split_lines = to_string.split("\n");
        split_lines.forEach(function (line, i){
            
            if(line.includes(" /")|| line.includes('\n' + '/' )){
                paths ++;
                indexes.push(i);
            }
        });
        paths_file.write((`${file_name}, ${paths} `))
        if(indexes.length==0){
            paths_file.write((` \n`))
        }
        else{
            paths_file.write((`, `))
        }
        indexes.forEach(function (index, i){
            if(i==indexes.length-1){
                paths_file.write((`${index+1} \n`))
            }
            else{
                paths_file.write((`${index+1}, `))
            }
           
        });
        
    
        
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