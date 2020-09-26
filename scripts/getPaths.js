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
        var n_paths = 0
        var indexes = []
        var abs_paths = []
        fileBuffer =  fs.readFileSync(directory +  file_name, 'utf8');
        to_string = fileBuffer.toString();
        split_lines = to_string.split("\n");
        split_lines.forEach(function (line, i){
            
            if(line.includes(" /")==true || line.includes('\n' + '/' )==true){
                if (line.includes(" //")==false && line.includes(" /:")==false && line.includes(" /(")==false && line.includes(" /^")==false && line.includes(' /"')==false && line.includes(" / ")==false && line.includes(" /p")==false && line.includes(" />")==false && line.includes("#")==false){
                    n_paths ++;
                    indexes.push(i);
                    abs_paths.push(line)
                }
               
            }
            if(line.includes("C:\\")){
                
                    n_paths ++;
                    indexes.push(i);
                    abs_paths.push(line)
                
               
            }
        });
        paths_file.write((`${file_name}, ${n_paths} `))
        if(indexes.length==0){ 
            paths_file.write((` \n`))
        }
        else{
            paths_file.write((`, `))
        }
        abs_paths.forEach(function (path, i){
            if(i==abs_paths.length-1){
                paths_file.write((`${path} \n`))
            }
            else{
                paths_file.write((`${path}, `))
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