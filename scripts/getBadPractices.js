const path = require('path');
const fs = require('fs');
const yaml = require ("yaml");

const directoryPath = path.join('github_yamls');
const directory = './github_yamls/';

const bad_practices_file = fs.createWriteStream('bad_practices.txt');

const defaultOptions = {
   
    maxAliasCount: -1,
   
  }

fs.readdir(directoryPath, function (err, files) {
   
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(async function (file_name) {
        var n_bad_practices = 0
        var bad_practices = []
        if(getAbsolutePaths(file_name, bad_practices).length>0){
            n_bad_practices++;
        }
        //bad_practices_file.write((`${file_name}, ${bad_practices[0]} \n`))
if(getJobsNamesSignificance(file_name, bad_practices).length>0){
            n_bad_practices++;
        }

        if(getComments(file_name, bad_practices).length>0){
            n_bad_practices++;
        }
        if(getEnvironmentVariables(file_name, bad_practices).length>0){
            n_bad_practices++;
        }
        if(getActions(file_name, bad_practices).length>0){
            n_bad_practices++;
        }
       
        if(bad_practices.length>0){
            bad_practices_file.write((`${file_name}, ${bad_practices.length}, `))
            bad_practices.forEach(function (bad_practice, i){
                if(i==bad_practices.length-1){
                    bad_practices_file.write((`${bad_practice} \n`))
                }
                else{
                    bad_practices_file.write((`${bad_practice}, `))
                }
            })}
            else{
                bad_practices_file.write((`${file_name}, ${bad_practices.length} \n`))
            }
        });
});

function getAbsolutePaths(file_name, bad_practices){
      
    try{
        var n_paths = 0
        var abs_paths
        fileBuffer =  fs.readFileSync(directory +  file_name, 'utf8');
        to_string = fileBuffer.toString();
        split_lines = to_string.split("\n");
        split_lines.forEach(function (line, i){
            
            if(line.includes(" /")==true || line.includes('\n' + '/' )==true){
                if (line.includes(" //")==false && line.includes(" /:")==false && line.includes(" /(")==false && line.includes(" /^")==false && line.includes(' /"')==false && line.includes(" / ")==false && line.includes(" /p")==false && line.includes(" />")==false && line.includes("#")==false){
                    n_paths ++;
                }               
            }
            if(line.includes("C:\\")){
                n_paths++;
            }
            
        });  
        if (n_paths>0){
            abs_paths = true
            bad_practices.push("absolute paths")
        }   
        else{
            abs_paths=false
        } 
 }                 
 catch(err){
     console.log(err + " " + file_name);    
 }   
 return bad_practices
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

function getJobsNamesSignificance(file_name, bad_practices){

        try{
            var file = fs.readFileSync(directory +  file_name, 'utf8')
            var yaml_file = yaml.parse(file, defaultOptions)
            var n_jobs = 0
            var not_significative

    
            yaml2array(yaml_file.jobs).forEach(function(jobid, i){
            
                    var job_name = jobid.name
                    if(jobid.name == undefined){
                        job_name = "-"
                    }
                    var job_id = Object.keys(yaml_file.jobs)[i]

                    if((job_name.includes("documentation")==false) && (job_name.includes("docs")==false) && (job_id.includes("docs")==false) && (job_name.includes("docgen")==false) && (job_id.includes("docgen")==false) && (job_name.includes("comment")==false) && (job_id.includes("comment")==false) && (job_name.includes("build") == false) && (job_name.includes("Build")==false) && (job_id.includes("build") == false) && (job_id.includes("Build")==false) && (job_name.includes("install") == false) && (job_name.includes("Install")==false) && (job_id.includes("install") == false) && (job_id.includes("Install")==false) && (job_name.includes("test") == false || job_name.includes("latest")==true) && (job_name.includes("Test") == false) && (job_name.includes("codecov") == false) && (job_name.includes("coverage") == false) && (job_id.includes("test") == false || job_name.includes("latest")==true) && (job_id.includes("Test")==false) && (job_id.includes("codecov") == false) && (job_id.includes("coverage") == false) && (job_name.includes("acceptance")==false) && (job_id.includes("acceptance")==false) && (job_name.includes("lint") == false) && (job_name.includes("Lint")==false) && (job_id.includes("lint") == false) && (job_id.includes("Lint")==false) && (job_name.includes("clang")==false) && (job_id.includes("clang")==false) && (job_name.includes("sonar")==false) && (job_id.includes("sonar")==false) && (job_name.includes("findbugs")==false) && (job_id.includes("findbugs")==false) && (job_name.includes("scanner")==false) && (job_id.includes("scanner")==false) && (job_name.includes("verify")==false) && (job_id.includes("verify")==false) && (job_name.includes("validate")==false) && (job_id.includes("validate")==false) && (job_name.includes("flake")==false) && (job_id.includes("flake")==false) && ((job_name.includes("static")==false) || (job_name.includes("analysis")==false)) && ((job_id.includes("static")==false) || (job_id.includes("analysis")==false)) && (job_name.includes("release") == false) && (job_name.includes("Release")==false) && (job_id.includes("release") == false) && (job_id.includes("Release")==false) && (job_name.includes("publish") == false) && (job_name.includes("Publish")==false) && (job_id.includes("publish") == false) && (job_id.includes("Publish")==false) && (job_name.includes("deploy") == false) && (job_name.includes("Deploy")==false) && (job_id.includes("deploy") == false) && (job_id.includes("Deploy")==false) && (job_name.includes("deliver")==false) && (job_id.includes("deliver")==false) && (job_name.includes("docker")==false) && (job_id.includes("docker")==false) && (job_id.includes("linux")==false) && (job_id.includes("windows")==false)  && (job_id.includes("macos")==false)  && (job_id.includes("macOs")==false) && (job_id.includes("MacOs")==false)  && (job_id.includes("ubuntu")==false) && (job_name.includes("update") == false) && (job_name.includes("Update")==false) && (job_id.includes("update") == false) && (job_id.includes("Update")==false) && (job_name.includes("quality") == false) && (job_name.includes("Quality")==false) && (job_id.includes("quality") == false) && (job_id.includes("Quality")==false) && (job_name.includes("bench") == false) && (job_name.includes("Bench")==false) && (job_id.includes("bench") == false) && (job_id.includes("Bench")==false) && (job_name.includes("check")==false) && (job_name.includes("Check")==false) && (job_id.includes("check")==false) && (job_id.includes("Check")==false) && (job_name.includes("qA")==false) && (job_id.includes("qA")==false) && (job_name.includes("format")==false) && (job_id.includes("format")==false)  && (job_name.includes("prettier")==false) && (job_id.includes("prettier")==false) && (job_name.includes("style")==false) && (job_id.includes("style")==false) && (job_name.includes("audit")==false) && (job_id.includes("audit")==false) && (job_name.includes("greetings")==false) && (job_id.includes("greetings")==false) && ((job_name.includes("hello")==false) || (job_name.includes("world")==false))  && ((job_id.includes("hello")==false) || (job_id.includes("world")==false)) && (job_name.includes("sync")==false) && (job_id.includes("sync")==false) && (job_name.includes("CI")==false) && (job_id.includes("CI")==false) && (job_name.includes("generate")==false) && (job_id.includes("generate")==false) && (job_name.includes("stale")==false) && (job_id.includes("stale")==false) && (job_name.includes("issues")==false) && (job_id.includes("issues")==false) && (job_name.includes("push")==false) && (job_id.includes("push")==false) && (job_name.includes("invite")==false) && (job_id.includes("invite")==false) && (job_name.includes("rebase")==false) && (job_id.includes("rebase")==false) && (job_name.includes("label")==false) && (job_id.includes("label")==false) && (job_name.includes("run")==false) && (job_id.includes("run")==false) && (job_name.includes("nightly")==false) && (job_id.includes("nightly")==false) && (job_name.includes("setup")==false) && (job_id.includes("setup")==false) && (job_name.includes("notification")==false) && (job_id.includes("notification")==false) && (job_name.includes("notify")==false) && (job_id.includes("notify")==false) && (job_name.includes("purge")==false || job_name.includes("cache")==false) && (job_id.includes("purge")==false || job_id.includes("cache")==false) && (job_name.includes("license")==false) && (job_id.includes("license")==false) && (job_name.includes("clean")==false) && (job_id.includes("clean")==false) && (job_name.includes("execute")==false) && (job_id.includes("execute")==false)){ 
                        n_jobs++;
                    }
                })
                if(n_jobs>0){
                    not_significative = true
                    bad_practices.push("not significative job's name")
                }
                else {
                    not_significative = false
                }
}                 
catch(err){
    console.log(err + " " + file_name);    
}   
return bad_practices
}

function getComments(file_name, bad_practices){
      
    try{
        var n_comments = 0
        var comments
        fileBuffer =  fs.readFileSync(directory +  file_name, 'utf8');
        to_string = fileBuffer.toString();
        split_lines = to_string.split("\n");
        split_lines.forEach(function (line){
            
            if(line.includes("# ")== true || line.includes('\n' + '#' )==true){
                n_comments ++;
            }
        });
        if(n_comments==0){
            comments = false
            bad_practices.push("no comments")
        }
        else{
            comments = true
        }
      
        
 }                 
 catch(err){
     console.log(err + " " + file_name);    
 }   
 return bad_practices
}

function getEnvironmentVariables(file_name, bad_practices){
    var env_var
    if(analyzeGeneralEnv==0 && analyzeJobsEnv == 0 && analyzeStepsEnv == 0){
        env_var = false
        bad_practices.push("no env variables")
    }
    else{
        env_var = true
    }
    return bad_practices
}
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


 function analyzeStepsEnv(file_name){
      
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

 function getActions(file_name, bad_practices){
     var actions
      
    try{
     var file = fs.readFileSync(directory +  file_name, 'utf8')
     
     if(file.includes("actions/")==true){
         actions = true
         bad_practices.push("github actions")
     }
     else{
         actions = false
        }
 }                 
 catch(err){
     console.log(err + " " + file_name);    
 }
 return bad_practices      
}