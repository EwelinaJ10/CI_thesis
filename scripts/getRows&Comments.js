const path = require('path');
const fs = require('fs');

//leggo la cartella 
const directoryPath = path.join('/yamls/github_yamls');
const directory = '/yamls/github_yamls/';

const number_of_rows = fs.createWriteStream('number_of_rows__and_comments_per_file.txt');
//const use_of_actions = fs.createWriteStream('number_of_rows.txt');
var rows_of_comments = []
const defaultOptions = {
   
    maxAliasCount: -1,
   
  }

fs.readdir(directoryPath, function (err, files) {
   
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file_name) {
       getRows(file_name);
    });
});

 function getRows(file_name){
      
       try{
           var comments = 0
           fileBuffer =  fs.readFileSync(directory +  file_name, 'utf8');
           to_string = fileBuffer.toString();
           split_lines = to_string.split("\n");
           split_lines.forEach(function (line){
               
               if(line.includes("#")){
                   comments ++;
               }
           });

           
           //console.log(split_lines.length-1);
           number_of_rows.write((`${file_name}, ${split_lines.length-1}, ${comments} \n`))
       
           
    }                 
    catch(err){
        console.log(err + " " + file_name);    
    }      
}