//script per scaricare i file yaml di cui i percorsi sono scritti in un file apposito, e metterli in una cartella

const fs = require('fs');
const readline = require('readline');
const stream = require('stream');


const instream = fs.createReadStream('jobs_id_name_file.txt');
const outstream = new stream;

const multi_jobs_classified = fs.createWriteStream('jobs_classified.txt');

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
            
            if((job_name.includes("build") == true) || (job_name.includes("Build")==true) || (job_id.includes("Build")==true) || (job_id.includes("build") == true)){
                //build_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))
                multi_jobs_classified.write((`build, ${job_id}, ${job_name}, ${file_name}\n`))
            }
            if((job_name.includes("install") == true) || (job_name.includes("Install")==true) || (job_id.includes("install") == true) || (job_id.includes("Install")==true) ){
                multi_jobs_classified.write((`install, ${job_id}, ${job_name}, ${file_name}\n`))
            }
            if ((job_name.includes("test") == true && job_name.includes("latest")==false) || (job_name.includes("Test") == true) || (job_name.includes("check") == true) || (job_name.includes("Check") == true)|| (job_name.includes("codecov") == true) || (job_name.includes("Codecov")==true) || (job_name.includes("coverage") == true) || (job_name.includes("Coverage")==true) || ((job_id.includes("test") == true) && (job_id.includes("latest")==false))  || (job_id.includes("Test") == true) || (job_id.includes("check")==true)||(job_id.includes("Check")) || (job_id.includes("codecov") == true) ||  (job_id.includes("coverage") == true) || (job_name.includes("lint") == true) || (job_name.includes("Lint")==true) || (job_id.includes("lint") == true) || (job_id.includes("Lint")==true) || (job_name.includes("quality") == true) || (job_name.includes("Quality")==true) || (job_id.includes("quality") == true) || (job_id.includes("Quality")==true) || (job_name.includes("bench") == true) || (job_name.includes("Bench")==true) || (job_id.includes("bench") == true) || (job_id.includes("Bench")==true)){       
                //test_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))
                if(((job_name.includes("integration")==true || job_name.includes("Integration")==true) && (job_name.includes("test")==true || job_name.includes("Test")==true)) || ((job_id.includes("integration") == true || job_id.includes("Integration")==true) && (job_id.includes("test")==true || job_id.includes("Test")==true))){
                    multi_jobs_classified.write((`integration-test, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                else if(((job_name.includes("unit")|| job_name.includes("Unit")) && (job_name.includes("test")|| job_name.includes("Test"))) || ( ((job_id.includes("unit") == true) || (job_id.includes("Unit")==true)) && ((job_id.includes("test") == true) || (job_id.includes("Test")==true)))){
                    multi_jobs_classified.write((`unit-test, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                else if(job_name.includes("codecov")||(job_id.includes("codecov") == true)||job_name.includes("coverage")||(job_id.includes("coverage") == true)){
                    multi_jobs_classified.write((`white-box-test, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                else if ((job_name.includes("lint") == true) || (job_name.includes("Lint")==true) || (job_id.includes("lint") == true) || (job_id.includes("Lint")==true)){
                    //static_analysis_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))
                    multi_jobs_classified.write((`static_analysis, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                else{
                    multi_jobs_classified.write((`test, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                
            }
            if ((job_name.includes("release") == true) || (job_name.includes("Release") == true) || (job_id.includes("release") == true) || (job_id.includes("Release") == true) || (job_name.includes("publish") == true) || (job_name.includes("Publish")==true) || (job_id.includes("publish") == true) || (job_id.includes("Publish")==true)){    
                //release_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))   
                multi_jobs_classified.write((`release, ${job_id}, ${job_name}, ${file_name}\n`))         
            }
            if ((job_name.includes("deploy") == true) || (job_name.includes("Deploy")==true)|| (job_id.includes("deploy") == true) || (job_id.includes("Deploy")==true)){    
                //deploy_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))  
                multi_jobs_classified.write((`deploy, ${job_id}, ${job_name}, ${file_name}\n`)) 
            }
    
            if ((job_name.includes("update") == true) || (job_name.includes("Update")==true) || (job_id.includes("update") == true) || (job_id.includes("Update")==true)){
                //static_analysis_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))
                multi_jobs_classified.write((`update, ${job_id}, ${job_name}, ${file_name}\n`))
            }
            
            if((job_name.includes("build") == false) && (job_name.includes("Build")==false) && (job_id.includes("build") == false) && (job_id.includes("Build")==false) && (job_name.includes("install") == false) && (job_name.includes("Install")==false) && (job_id.includes("install") == false) && (job_id.includes("Install")==false) && (job_name.includes("test") == false || job_name.includes("latest")==true) && (job_name.includes("Test") == false) && (job_name.includes("codecov") == false) && (job_name.includes("coverage") == false) && (job_id.includes("test") == false || job_name.includes("latest")==true) && (job_id.includes("Test")==false) && (job_id.includes("codecov") == false) && (job_id.includes("coverage") == false) && (job_name.includes("lint") == false) && (job_name.includes("Lint")==false) && (job_id.includes("lint") == false) && (job_id.includes("Lint")==false) && (job_name.includes("release") == false) && (job_name.includes("Release")==false) && (job_id.includes("release") == false) && (job_id.includes("Release")==false) && (job_name.includes("publish") == false) && (job_name.includes("Publish")==false) && (job_id.includes("publish") == false) && (job_id.includes("Publish")==false) && (job_name.includes("deploy") == false) && (job_name.includes("Deploy")==false) && (job_id.includes("deploy") == false) && (job_id.includes("Deploy")==false) && (job_name.includes("update") == false) && (job_name.includes("Update")==false) && (job_id.includes("update") == false) && (job_id.includes("Update")==false) && (job_name.includes("quality") == false) && (job_name.includes("Quality")==false) && (job_id.includes("quality") == false) && (job_id.includes("Quality")==false) && (job_name.includes("bench") == false) && (job_name.includes("Bench")==false) && (job_id.includes("bench") == false) && (job_id.includes("Bench")==false) && (job_name.includes("check")==false) && (job_name.includes("Check")==false) && (job_id.includes("check")==false) && (job_id.includes("Check")==false)){
                if(file_name.includes("build") == true || file_name.includes("Build")==true){
                    multi_jobs_classified.write((`build, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                if(file_name.includes("install") == true || file_name.includes("Install")==true){
                    multi_jobs_classified.write((`install, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                if((file_name.includes("test") == true && file_name.includes("latest")==false) || (file_name.includes("Test") == true) || (file_name.includes("check")==true) || (file_name.includes("Check")==true) ||(file_name.includes("lint") == true) || (file_name.includes("Lint")==true) || (file_name.includes("codecov") == true) || (file_name.includes("Codecov")==true) || (file_name.includes("coverage") == true) || (file_name.includes("Coverage")==true) || (file_name.includes("quality") == true) || (file_name.includes("Quality")==true) || (file_name.includes("bench") == true) || (file_name.includes("Bench")==true)){
                    if((file_name.includes("integration")==true || file_name.includes("Integration")==true) && (file_name.includes("test")==true || file_name.includes("Test")==true)){
                        multi_jobs_classified.write((`integration-test, ${job_id}, ${job_name}, ${file_name}\n`))
                    }
                    else if(((file_name.includes("unit")==true || file_name.includes("Unit")==true)) && ((file_name.includes("test")==true || file_name.includes("Test")==true))){
                        multi_jobs_classified.write((`unit-test, ${job_id}, ${job_name}, ${file_name}\n`))
                    }
                    else if(file_name.includes("codecov")==true||file_name.includes("Codecov")==true||file_name.includes("coverage")==true || file_name.includes("Coverage")==true){
                        multi_jobs_classified.write((`white-box-test, ${job_id}, ${job_name}, ${file_name}\n`))
                    }
                    else if ((file_name.includes("lint") == true)|| (file_name.includes("Lint")==true)){
                        //static_analysis_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))
                        multi_jobs_classified.write((`static_analysis, ${job_id}, ${job_name}, ${file_name}\n`))
                    }
                    else{
                        multi_jobs_classified.write((`test, ${job_id}, ${job_name}, ${file_name}\n`))
                    }
                }
                if((file_name.includes("deploy") == true) || (file_name.includes("Deploy")==true)){
                    multi_jobs_classified.write((`deploy, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                if((file_name.includes("release") == true) || (file_name.includes("Release")==true)  || (file_name.includes("publish") == true) || (file_name.includes("Publish")==true)){
                    multi_jobs_classified.write((`release, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                if((file_name.includes("update") == true) || (file_name.includes("Update")==true)){
                    multi_jobs_classified.write((`update, ${job_id}, ${job_name}, ${file_name}\n`))
                }  
                if((file_name.includes("build") == false) && (file_name.includes("Build")==false) && (file_name.includes("install") == false) && (file_name.includes("Install")==false) && (file_name.includes("test") == false || file_name.includes("latest")) && (file_name.includes("Test") == false) && (file_name.includes("lint") == false) && (file_name.includes("Lint")==false) && (file_name.includes("codecov") == false) && (file_name.includes("Codecov")==false) && (file_name.includes("coverage") == false) && (file_name.includes("Coverage")==false) && (file_name.includes("deploy") == false) && (file_name.includes("Deploy")==false) && (file_name.includes("release") == false) && (file_name.includes("Release")==false) && (file_name.includes("publish") == false) && (file_name.includes("Publish")==false) && (file_name.includes("update") == false) && (file_name.includes("Update")==false) && (file_name.includes("Check")==false) && (file_name.includes("check")==false) && (file_name.includes("bench")==false) && (file_name.includes("Bench")==false) && (file_name.includes("quality")==false) && (file_name.includes("Quality")==false)){
                    multi_jobs_classified.write((`unclassified, ${job_id}, ${job_name}, ${file_name}\n`))
            }
        }
    }
        catch (error) {
            console.log(error);
          }
    }

/*function classifySingleJobs(job){

    try{
        var array = job.split(',');
        var job_id = array[0]
        var job_name = array[1]
        var file_name = array[2]
        
        if((job_name.includes("build") == true) || (job_id.includes("build") == true) || (file_name.includes("build") == true) || (job_name.includes("install") == true) || (job_id.includes("install") == true) || (file_name.includes("install") == true)){
            //build_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))
            single_jobs_classified.write((`build, ${job_id}, ${job_name}, ${file_name}\n`))
        }
        if ((job_name.includes("test") == true && job_name!="latest") ||(job_name.includes("Test") == true)||(job_name.includes("codecov") == true) || (job_name.includes("coverage") == true) || (job_name.includes("integration") == true) || (job_name.includes("lint") == true) || (job_name.includes("bench") == true)|| (job_name.includes("quality")) || (job_id.includes("test") == true && job_id!="latest") ||(job_id.includes("Test") == true) || (job_id.includes("codecov") == true) || (job_id.includes("coverage") == true) || (job_id.includes("integration")==true) ||  (job_id.includes("lint") == true) || (job_id.includes("bench")==true) || (job_id.includes("quality")) || (file_name.includes("test") == true  && file_name!="latest") ||(file_name.includes("Test") == true) ||(file_name.includes("codecov") == true)||(file_name.includes("coverage") == true)||(file_name.includes("integration") == true) ||  (file_name.includes("lint") == true) || (file_name.includes("bench") ==true)|| (file_name.includes("quality") == true)){
            //static_analysis_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))
       
            if(job_name.includes("integration")||(job_id.includes("integration") == true)){
                single_jobs_classified.write((`integration-test, ${job_id}, ${job_name}, ${file_name}\n`))
            } 
            else if(job_name.includes("unit")||(job_id.includes("unit") == true)){
                single_jobs_classified.write((`unit-test, ${job_id}, ${job_name}, ${file_name}\n`))
            }
            else if(job_name.includes("codecov")||(job_id.includes("codecov") == true)||job_name.includes("coverage")||(job_id.includes("coverage") == true)){
                single_jobs_classified.write((`white-box-test, ${job_id}, ${job_name}, ${file_name}\n`))
            }
            else if ((job_name.includes("lint") == true) || (job_id.includes("lint") == true)){
                //static_analysis_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))
                single_jobs_classified.write((`static_analysis, ${job_id}, ${job_name}, ${file_name}\n`))
            }
            else{
                single_jobs_classified.write((`test, ${job_id}, ${job_name}, ${file_name}\n`))
            }   
        } 
            //test_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))
            
        if ((job_name.includes("release") == true) || (job_id.includes("release") == true) || (file_name.includes("release") == true) || (job_name.includes("publish") == true) || (job_id.includes("publish") == true) || (file_name.includes("publish") == true)){    
            //release_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))   
            single_jobs_classified.write((`release, ${job_id}, ${job_name}, ${file_name}\n`))         
        }
        if ((job_name.includes("deploy") == true) || (job_id.includes("deploy") == true) || (file_name.includes("deploy") == true)){    
            //deploy_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))  
            single_jobs_classified.write((`deploy, ${job_id}, ${job_name}, ${file_name}\n`)) 
        }
        
       
        if ((job_name.includes("update") == true) || (job_id.includes("update") == true) || (file_name.includes("update") == true)){
            //static_analysis_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))
            single_jobs_classified.write((`update, ${job_id}, ${job_name}, ${file_name}\n`))
        }
        if((job_name.includes("build") == false) && (job_id.includes("build") == false) && (file_name.includes("build")==false) && (job_name.includes("install") == false) && (job_id.includes("install") == false) && (file_name.includes("install")==false) && (job_name.includes("test") == false || job_name=="latest" ) && (job_name.includes("Test") == false) && (job_name.includes("codecov") == false) && (job_name.includes("coverage") == false) && (job_id.includes("test") == false || job_name=="latest") && (job_id.includes("Test")==false) && (job_id.includes("codecov") == false) && (job_id.includes("coverage") == false) && (file_name.includes("test")==false || file_name=="latest") && (file_name.includes("Test")==false) && (file_name.includes("codecov")==false) && (file_name.includes("coverage")==false) && (job_name.includes("lint") == false) && (job_id.includes("lint") == false) && (file_name.includes("lint")==false) && (job_name.includes("release") == false) && (job_id.includes("release") == false) && (file_name.includes("release")==false) && (job_name.includes("publish") == false) && (job_id.includes("publish") == false)  && (file_name.includes("publish")==false) && (job_name.includes("deploy") == false) && (job_id.includes("deploy") == false) && (file_name.includes("deploy")==false) && (job_name.includes("update") == false) && (job_id.includes("update") == false) && (file_name.includes("update")==false) && (job_name.includes("quality") == false) && (job_id.includes("quality") == false) && (file_name.includes("quality")==false) && (job_name.includes("bench") == false) && (job_id.includes("bench") == false) && (file_name.includes("bench")==false)){
            single_jobs_classified.write((`unclassified, ${job_id}, ${job_name}, ${file_name}\n`))
        }
        
        else{ //altro  
            other_jobs.write((`${job_id}, ${job_name}, ${file_name} \n`))
            single_jobs_classified.write((`${job_id}, ${job_name}, ${file_name}, other \n`))
        } 
    }
    catch (error) {
        console.log(error);
      }
}
)*/


