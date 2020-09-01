//script per classificare i vari jobs 

const fs = require('fs');
const readline = require('readline');
const stream = require('stream');


const instream = fs.createReadStream('jobs_id_name_file.txt');
const outstream = new stream;

const multi_jobs_classified = fs.createWriteStream('jobs_classified_added_generic_CI.txt');

const jobs = []


var rl = readline.createInterface(instream, outstream);

rl.on('line', function(line) {

    jobs.push(line)
})
rl.on('close', function() {
   
    for(let i = 0; i<jobs.length; i++){
        classifyMultiJobs(jobs[i])
    }});

function classifyMultiJobs(job){

        try{
            var array = job.split(',');
            var job_id = array[0]
            var job_name = array[1]
            var file_name = array[2]

            //controllo sul nome/id del job
            
            if(job_name.includes("CI")==true || job_id.includes("CI")==true || job_name.includes("sync")==true || job_id.includes("sync")==true || job_name.includes("generate")==true || job_id.includes("generate")==true || job_name.includes("stale")==true || job_id.includes("stale")==true || job_name.includes("issues")==true || job_id.includes("issues")==true || job_name.includes("push")==true || job_id.includes("push")==true || job_name.includes("invite")==true || job_id.includes("invite")==true || job_name.includes("rebase")==true || job_id.includes("rebase")==true || job_name.includes("label")==true || job_id.includes("label")==true || job_name.includes("run")==true || job_id.includes("run")==true || job_name.includes("nightly")==true || job_id.includes("nightly")==true || job_name.includes("setup")==true || job_id.includes("setup")==true || job_name.includes("notification")==true || job_id.includes("notification")==true || job_name.includes("notify")==true || job_id.includes("notify")==true || (job_name.includes("purge")==true && job_name.includes("cache")==true) || (job_id.includes("purge")==true && job_id.includes("cache")==true) || job_name.includes("license")==true || job_id.includes("license")==true || job_name.includes("clean")==true || job_id.includes("clean")==true || job_name.includes("execute")==true || job_id.includes("execute")==true ){
                multi_jobs_classified.write((`generic CI, ${job_id}, ${job_name}, ${file_name}\n`))
            }
            if((job_name.includes("documentation")==true) || (job_id.includes("documentation")==true)||(job_name.includes("docgen")==true) || (job_id.includes("docgen")==true) || (job_name.includes("docs")==true) || (job_id.includes("docs")==true) || (job_id.includes("comment")==true) || (job_name.includes("comment")==true)){
                multi_jobs_classified.write((`documentation, ${job_id}, ${job_name}, ${file_name}\n`))
            }
            if((job_name.includes("build") == true) || (job_name.includes("Build")==true) || (job_id.includes("Build")==true) || (job_id.includes("build") == true)){
                //build_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))
                multi_jobs_classified.write((`build, ${job_id}, ${job_name}, ${file_name}\n`))
            }
            if((job_name.includes("install") == true) || (job_name.includes("Install")==true) || (job_id.includes("install") == true) || (job_id.includes("Install")==true) ){
                multi_jobs_classified.write((`install, ${job_id}, ${job_name}, ${file_name}\n`))
            }
            if ((job_name.includes("test") == true && job_name.includes("latest")==false) || (job_name.includes("Test") == true) || (job_name.includes("check") == true) || (job_name.includes("Check") == true) || ((job_id.includes("test") == true) && (job_id.includes("latest")==false))  || (job_id.includes("Test") == true) || (job_id.includes("check")==true)||(job_id.includes("Check")) || (job_name.includes("quality") == true) || (job_name.includes("Quality")==true) || (job_id.includes("quality") == true) || (job_id.includes("Quality")==true) || (job_name.includes("bench") == true) || (job_name.includes("Bench")==true) || (job_id.includes("bench") == true) || (job_id.includes("Bench")==true) || (job_name.includes("qA")==true) || (job_id.includes("qA")==true) || (job_name.includes("audit")==true) || (job_id.includes("audit")==true) || (job_name.includes("fuzz")==true) || (job_id.includes("fuzz")==true)){
                if((job_name.includes("unit")==false) && (job_id.includes("unit")==false) && (job_name.includes("integration")==false) && (job_id.includes("integration")==false)){
                    multi_jobs_classified.write((`qA, ${job_id}, ${job_name}, ${file_name}\n`))
                }
            }     
               
            if(((job_name.includes("integration")==true || job_name.includes("Integration")==true) && (job_name.includes("test")==true || job_name.includes("Test")==true)) || ((job_id.includes("integration") == true || job_id.includes("Integration")==true) && (job_id.includes("test")==true || job_id.includes("Test")==true))){
                multi_jobs_classified.write((`integration-test, ${job_id}, ${job_name}, ${file_name}\n`))
            }
            if(((job_name.includes("unit")|| job_name.includes("Unit")) && (job_name.includes("test")|| job_name.includes("Test"))) || ( ((job_id.includes("unit") == true) || (job_id.includes("Unit")==true)) && ((job_id.includes("test") == true) || (job_id.includes("Test")==true)))){
                multi_jobs_classified.write((`unit-test, ${job_id}, ${job_name}, ${file_name}\n`))
            }
            if(job_name.includes("codecov")||(job_id.includes("codecov") == true)||job_name.includes("coverage")||(job_id.includes("coverage") == true)){
                multi_jobs_classified.write((`white-box-test, ${job_id}, ${job_name}, ${file_name}\n`))
            }
            if ((job_name.includes("lint") == true) || (job_name.includes("Lint")==true) || (job_id.includes("lint") == true) || (job_id.includes("Lint")==true) || (job_name.includes("clang")==true) || (job_id.includes("clang")==true) || (job_name.includes("sonar")==true) || (job_id.includes("sonar")==true) || (job_name.includes("findbugs")==true) || (job_id.includes("findbugs")==true) || (job_name.includes("validate")==true) || (job_id.includes("validate")==true) || (job_name.includes("verify")==true) || (job_id.includes("verify")==true) || (job_name.includes("scanner")==true) || (job_id.includes("scanner")==true) || (job_name.includes("static")==true && job_name.includes("analysis")==true) || (job_id.includes("static")==true && job_id.includes("analysis")==true) || (job_name.includes("flake")==true) || (job_id.includes("flake")==true) ) {
                    //static_analysis_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))
                multi_jobs_classified.write((`static_analysis, ${job_id}, ${job_name}, ${file_name}\n`))
            }
    
                
            if((job_name.includes("acceptance")==true) || (job_id.includes("acceptance")==true)){
                multi_jobs_classified.write((`acceptance-test, ${job_id}, ${job_name}, ${file_name}\n`)) 
            }
            if ((job_name.includes("release") == true) || (job_name.includes("Release") == true) || (job_id.includes("release") == true) || (job_id.includes("Release") == true) || (job_name.includes("publish") == true) || (job_name.includes("Publish")==true) || (job_id.includes("publish") == true) || (job_id.includes("Publish")==true)){    
                //release_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))   
                multi_jobs_classified.write((`release, ${job_id}, ${job_name}, ${file_name}\n`))         
            }
            if ((job_name.includes("deploy") == true) || (job_name.includes("Deploy")==true)|| (job_id.includes("deploy") == true) || (job_id.includes("Deploy")==true) || (job_name.includes("deliver")==true) || (job_id.includes("deliver")==true) || (job_name.includes("docker")==true) || (job_id.includes("docker")==true) || (job_id.includes("linux")==true) || (job_id.includes("macos")==true) || (job_id.includes("MacOs")==true)  || (job_id.includes("macOs")==true) || (job_id.includes("ubuntu")==true)  || (job_id.includes("windows")==true) || (job_id.includes("Windows")==true) || (job_name.includes("prepare")==true) || (job_id.includes("prepare")) ){    
                //deploy_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))  
                multi_jobs_classified.write((`deploy, ${job_id}, ${job_name}, ${file_name}\n`)) 
            }
    
            if ((job_name.includes("update") == true) || (job_name.includes("Update")==true) || (job_id.includes("update") == true) || (job_id.includes("Update")==true)){
                //static_analysis_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))
                multi_jobs_classified.write((`update, ${job_id}, ${job_name}, ${file_name}\n`))
            }
            if((job_name.includes("format")==true) || (job_id.includes("format")==true) || (job_name.includes("prettier")==true) || (job_id.includes("prettier")==true) || (job_name.includes("style")==true) || (job_id.includes("style")==true) || (job_name.includes("whitespace")==true) || (job_id.includes("whitespace")==true)){
                multi_jobs_classified.write((`refactoring, ${job_id}, ${job_name}, ${file_name}\n`))
            }
            if((job_name.includes("hello")==true && job_name.includes("world")==true) || (job_id.includes("hello")==true && job_id.includes("world")==true) || (job_name.includes("greetings")==true) || (job_id.includes("greetings")==true)  ){
                multi_jobs_classified.write((`hello-world, ${job_id}, ${job_name}, ${file_name}\n`))
            }

            //controllo sul nome del file
            
            if((job_name.includes("documentation")==false) && (job_id.includes("documentation")==false) && (job_name.includes("docs")==false) && ( job_id.includes("docs")==false) && (job_name.includes("docgen")==false) && (job_id.includes("docgen")==false) && (job_name.includes("comment")==false) && (job_id.includes("comment")==false) && (job_name.includes("build") == false) && (job_name.includes("Build")==false) && (job_id.includes("build") == false) && (job_id.includes("Build")==false) && (job_name.includes("install") == false) && (job_name.includes("Install")==false) && (job_id.includes("install") == false) && (job_id.includes("Install")==false) && (job_name.includes("test") == false || job_name.includes("latest")==true) && (job_name.includes("Test") == false) && (job_name.includes("codecov") == false) && (job_name.includes("coverage") == false) && (job_id.includes("test") == false || job_name.includes("latest")==true) && (job_id.includes("Test")==false) && (job_id.includes("codecov") == false) && (job_id.includes("coverage") == false) && (job_name.includes("acceptance")==false) && (job_id.includes("acceptance")==false) && (job_name.includes("lint") == false) && (job_name.includes("Lint")==false) && (job_id.includes("lint") == false) && (job_id.includes("Lint")==false) && (job_name.includes("clang")==false) && (job_id.includes("clang")==false) && (job_name.includes("sonar")==false) && (job_id.includes("sonar")==false) && (job_name.includes("findbugs")==false) && (job_id.includes("findbugs")==false) && (job_name.includes("scanner")==false) && (job_id.includes("scanner")==false) && (job_name.includes("verify")==false) && (job_id.includes("verify")==false) && (job_name.includes("validate")==false) && (job_id.includes("validate")==false) && (job_name.includes("flake")==false) && (job_id.includes("flake")==false) && ((job_name.includes("static")==false) || (job_name.includes("analysis")==false)) && ((job_id.includes("static")==false) || (job_id.includes("analysis")==false)) && (job_name.includes("release") == false) && (job_name.includes("Release")==false) && (job_id.includes("release") == false) && (job_id.includes("Release")==false) && (job_name.includes("publish") == false) && (job_name.includes("Publish")==false) && (job_id.includes("publish") == false) && (job_id.includes("Publish")==false) && (job_name.includes("deploy") == false) && (job_name.includes("Deploy")==false) && (job_id.includes("deploy") == false) && (job_id.includes("Deploy")==false) && (job_name.includes("deliver")==false) && (job_id.includes("deliver")==false) && (job_name.includes("docker")==false) && (job_id.includes("docker")==false) && (job_id.includes("linux")==false) && (job_id.includes("windows")==false)  && (job_id.includes("macos")==false)  && (job_id.includes("macOs")==false) && (job_id.includes("MacOs")==false)  && (job_id.includes("ubuntu")==false) && (job_name.includes("update") == false) && (job_name.includes("Update")==false) && (job_id.includes("update") == false) && (job_id.includes("Update")==false) && (job_name.includes("quality") == false) && (job_name.includes("Quality")==false) && (job_id.includes("quality") == false) && (job_id.includes("Quality")==false) && (job_name.includes("bench") == false) && (job_name.includes("Bench")==false) && (job_id.includes("bench") == false) && (job_id.includes("Bench")==false) && (job_name.includes("check")==false) && (job_name.includes("Check")==false) && (job_id.includes("check")==false) && (job_id.includes("Check")==false) && (job_name.includes("qA")==false) && (job_id.includes("qA")==false) && (job_name.includes("format")==false) && (job_id.includes("format")==false)  && (job_name.includes("prettier")==false) && (job_id.includes("prettier")==false) && (job_name.includes("style")==false) && (job_id.includes("style")==false) && (job_name.includes("audit")==false) && (job_id.includes("audit")==false) && (job_name.includes("greetings")==false) && (job_id.includes("greetings")==false) && ((job_name.includes("hello")==false) || (job_name.includes("world")==false))  && ((job_id.includes("hello")==false) || (job_id.includes("world")==false)) && (job_name.includes("sync")==false) && (job_id.includes("sync")==false) && (job_name.includes("CI")==false) && (job_id.includes("CI")==false) && (job_name.includes("generate")==false) && (job_id.includes("generate")==false) && (job_name.includes("stale")==false) && (job_id.includes("stale")==false) && (job_name.includes("issues")==false) && (job_id.includes("issues")==false) && (job_name.includes("push")==false) && (job_id.includes("push")==false) && (job_name.includes("invite")==false) && (job_id.includes("invite")==false) && (job_name.includes("rebase")==false) && (job_id.includes("rebase")==false) && (job_name.includes("label")==false) && (job_id.includes("label")==false) && (job_name.includes("run")==false) && (job_id.includes("run")==false) && (job_name.includes("nightly")==false) && (job_id.includes("nightly")==false) && (job_name.includes("setup")==false) && (job_id.includes("setup")==false) && (job_name.includes("notification")==false) && (job_id.includes("notification")==false) && (job_name.includes("notify")==false) && (job_id.includes("notify")==false) && (job_name.includes("purge")==false || job_name.includes("cache")==false) && (job_id.includes("purge")==false || job_id.includes("cache")==false) && (job_name.includes("license")==false) && (job_id.includes("license")==false) && (job_name.includes("clean")==false) && (job_id.includes("clean")==false) && (job_name.includes("execute")==false) && (job_id.includes("execute")==false)){ 
                if(file_name.includes("CI")==true || (file_name.includes("ci")==true) || file_name.includes("sync")==true || file_name.includes("generate")==true || file_name.includes("stale")==true || file_name.includes("issues")==true || file_name.includes("push")==true || file_name.includes("invite")==true || file_name.includes("rebase")==true || file_name.includes("label")==true || file_name.includes("run")==true || file_name.includes("nightly")==true || file_name.includes("setup")==true || file_name.includes("notification")==true || file_name.includes("notify")==true || (file_name.includes("purge")==true && file_name.includes("cache")==true)|| file_name.includes("license")==true || file_name.includes("clean")==true || file_name.includes("execute")==true){
                    multi_jobs_classified.write((`generic CI, ${job_id}, ${job_name}, ${file_name}\n`))
                }

                if((file_name.includes("documentation")) || (file_name.includes("docgen")==true) || (file_name.includes("docs")==true) || (file_name.includes("comment")==true)){
                    multi_jobs_classified.write((`documentation, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                if(file_name.includes("build") == true || file_name.includes("Build")==true){
                    multi_jobs_classified.write((`build, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                if(file_name.includes("install") == true || file_name.includes("Install")==true){
                    multi_jobs_classified.write((`install, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                if((file_name.includes("test") == true && file_name.includes("latest")==false) || (file_name.includes("Test") == true) || (file_name.includes("check")==true) || (file_name.includes("Check")==true) || (file_name.includes("codecov") == true)  || (file_name.includes("quality") == true) || (file_name.includes("Quality")==true) || (file_name.includes("bench") == true) || (file_name.includes("Bench")==true) || (file_name.includes("qA")==true) || (file_name.includes("audit")==true)){
    
                    multi_jobs_classified.write((`qA, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                if((file_name.includes("integration")==true || file_name.includes("Integration")==true) && (file_name.includes("test")==true || file_name.includes("Test")==true)){
                     multi_jobs_classified.write((`integration-test, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                if(((file_name.includes("unit")==true || file_name.includes("Unit")==true)) && ((file_name.includes("test")==true || file_name.includes("Test")==true))){
                    multi_jobs_classified.write((`unit-test, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                if(file_name.includes("codecov")==true||file_name.includes("Codecov")==true||file_name.includes("coverage")==true || file_name.includes("Coverage")==true){
                    multi_jobs_classified.write((`white-box-test, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                if ((file_name.includes("lint") == true)|| (file_name.includes("Lint")==true) || (file_name.includes("clang")==true) || (file_name.includes("sonar")==true) || (file_name.includes("findbugs")==true) || (file_name.includes("validate")==true) || (file_name.includes("verify")==true) || (file_name.includes("scanner") ==true)  || (file_name.includes("static")==true && file_name.includes("analysis")==true) || (file_name.includes("flake")==true)){
                        //static_analysis_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))
                    multi_jobs_classified.write((`static_analysis, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                if((file_name.includes("acceptance")==true)){
                    multi_jobs_classified.write((`acceptance-test, ${job_id}, ${job_name}, ${file_name}\n`)) 
                }
               
                if((file_name.includes("release") == true) || (file_name.includes("Release")==true)  || (file_name.includes("publish") == true) || (file_name.includes("Publish")==true)){
                    multi_jobs_classified.write((`release, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                if((file_name.includes("deploy") == true) || (file_name.includes("Deploy")==true) || (file_name.includes("deliver")==true) || (file_name.includes("docker")==true) || (file_name.includes("linux")==true) || (file_name.includes("windows")==true) || (file_name.includes("Windows")==true) || (file_name.includes("ubunut")==true) || (file_name.includes("macos")==true) || (file_name.includes("MacOs")==true) || (file_name.includes("macOs")==true) || (file_name.includes("prepare")==true)){
                    multi_jobs_classified.write((`deploy, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                if((file_name.includes("update") == true) || (file_name.includes("Update")==true)){
                    multi_jobs_classified.write((`update, ${job_id}, ${job_name}, ${file_name}\n`))
                }  
                if((file_name.includes("format")==true) || (file_name.includes("prettier")==true) || (file_name.includes("style")==true) || (file_name.includes("whitespace")==true)){
                    multi_jobs_classified.write((`refactoring, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                if((file_name.includes("hello")==true && file_name.includes("world")==true) || (file_name.includes("greetings")==true)){
                    multi_jobs_classified.write((`hello-world, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                if((file_name.includes("documentation")==false) && (file_name.includes("docs")==false) && (file_name.includes("docgen")==false) && (file_name.includes("comment")==false) && (file_name.includes("build") == false) && (file_name.includes("Build")==false) && (file_name.includes("install") == false) && (file_name.includes("Install")==false) && (file_name.includes("test") == false || file_name.includes("latest")==true) && (file_name.includes("Test") == false) && (file_name.includes("codecov") == false) && (file_name.includes("coverage") == false) && (file_name.includes("acceptance")==false) && (file_name.includes("lint") == false) && (file_name.includes("Lint")==false)  && (file_name.includes("clang")==false) && (file_name.includes("sonar")==false) && (file_name.includes("findbugs")==false) && (file_name.includes("scanner")==false)  && (file_name.includes("verify")==false)  && (file_name.includes("validate")==false)  && (file_name.includes("flake")==false) && ((file_name.includes("static")==false) || (file_name.includes("analysis")==false)) && (file_name.includes("release") == false) && (file_name.includes("Release")==false)  && (file_name.includes("publish") == false) && (file_name.includes("Publish")==false) && (file_name.includes("deploy") == false) && (file_name.includes("Deploy")==false) && (file_name.includes("deliver")==false) && (file_name.includes("docker")==false)  && (file_name.includes("linux")==false)  && (file_name.includes("windows")==false)  && (file_name.includes("macos")==false) && (file_name.includes("macOs")==false) && (file_name.includes("MacOs")==false) && (file_name.includes("ubuntu")==false) && (file_name.includes("update") == false) && (file_name.includes("Update")==false)  && (file_name.includes("quality") == false) && (file_name.includes("Quality")==false) && (file_name.includes("bench") == false) && (file_name.includes("Bench")==false) && (file_name.includes("check")==false) && (file_name.includes("Check")==false) && (file_name.includes("qA")==false) && (file_name.includes("format")==false) && (file_name.includes("prettier")==false) && (file_name.includes("style")==false) && (file_name.includes("audit")==false) && (file_name.includes("greetings")==false)  && ((file_name.includes("hello")==false) || (file_name.includes("world")==false))  && (file_name.includes("sync")==false) && (file_name.includes("CI")==false) && (file_name.includes("ci")==false) && (file_name.includes("generate")==false) && (file_name.includes("stale")==false) && (file_name.includes("issues")==false)  && (file_name.includes("push")==false) && (file_name.includes("invite")==false) && (file_name.includes("rebase")==false) && (file_name.includes("label")==false)  && (file_name.includes("run")==false) && (file_name.includes("nightly")==false) && (file_name.includes("setup")==false) && (file_name.includes("notification")==false) && (file_name.includes("notify")==false) && (file_name.includes("purge")==false || file_name.includes("cache")==false) && (file_name.includes("license")==false) && (file_name.includes("clean")==false) && (file_name.includes("execute")==false) ){
                
                    multi_jobs_classified.write((`unclassified, ${job_id}, ${job_name}, ${file_name}\n`))
            }
        }
    }
        catch (error) {
            console.log(error);
          }
    }




