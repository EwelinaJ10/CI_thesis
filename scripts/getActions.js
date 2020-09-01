const path = require('path');
const fs = require('fs');
const yaml = require ("yaml");

//leggo la cartella 
const directoryPath = path.join(__dirname, 'github_yamls');
const directory = './github_yamls/';

const use_of_actions = fs.createWriteStream('use_of_actions.txt');

const defaultOptions = {
   
    maxAliasCount: -1,
   
  }

fs.readdir(directoryPath, function (err, files) {
   
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(async function (file_name) {
       await getActions(file_name);
    });
});

 function getActions(file_name){
      
       try{
        var file = fs.readFileSync(directory +  file_name, 'utf8')
        
        if(file.includes("actions/")==true){
            use_of_actions.write((`yes, ${file_name} \n`))
        }
        else{
            use_of_actions.write((`no, ${file_name} \n`))
        }
    }                 
    catch(err){
        console.log(err + " " + file_name);    
    }      
}