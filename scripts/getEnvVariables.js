const path = require('path');
const fs = require('fs');
const yaml = require ("yaml")

//leggo la cartella 
const directoryPath = path.join(__dirname, 'github_yamls');
const directory = './github_yamls/';

const use_of_env_variables = fs.createWriteStream('use_of_env_variables_prova.txt');


const defaultOptions = {
   
    maxAliasCount: -1,
   
  }

fs.readdir(directoryPath, function (err, files) {
   
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file_name) {
    
        use_of_env_variables.write((`${file_name}, ${analyzeGeneralEnv(file_name)}, ${analyzeJobsEnv(file_name)}, ${analyzeStepsEnv(file_name)} \n`))
        
    });
});

 function analyzeGeneralEnv(file_name){
      
    try{
     var file = fs.readFileSync(directory +  file_name, 'utf8')
     var yaml_file = yaml.parse(file, defaultOptions)
     var env
    
     if (yaml_file.env!=null){
        
         env = yaml2array(yaml_file.env).length
         
     }  
     else{
        env = 0;
     } 
              
    }


 catch(err){
     console.log(err + " " + file_name);    
 }      
 return env 
}
 function analyzeJobsEnv(file_name){
      
    try{
     var file = fs.readFileSync(directory +  file_name, 'utf8')
     var yaml_file = yaml.parse(file, defaultOptions)
     var n_jobs = yaml2array(yaml_file.jobs).length
     var env = 0
     yaml2array(yaml_file.jobs).forEach(function(job_id, i){
                if(job_id.env!=null){
        
                    env = env + yaml2array(job_id.env).length
                }
                else{
                    env = 0;
                 }   
            })              
 }

 catch(err){
     console.log(err + " " + file_name);    
 }   return env   
 }


 function analyzeStepsEnv(file_name, steps_env){
      
    try{
     var file = fs.readFileSync(directory +  file_name, 'utf8')
     var yaml_file = yaml.parse(file, defaultOptions)
     var env = 0
     yaml2array(yaml_file.jobs).forEach(function(job_id, i){
         yaml2array(job_id.steps).forEach(function(step_id, i){
            if(step_id.env!=null){
                env = env + yaml2array(step_id.env).length
            }
            else{
                env = 0;
             }  
         })
         
    })             
 }

 catch(err){
     console.log(err + " " + file_name);    
 }    
 return env  
 }

 function yaml2array(yaml){
    var result = [];
    var keys = Object.keys(yaml);
    keys.forEach(function(key){
        result.push(yaml[key]);
    });
    return result;
}
 