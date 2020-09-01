//script per vedere quali sono i motivi principali per cui i nomi non sono significativi (cosa contengono)

const fs = require('fs');
const readline = require('readline');
const stream = require('stream');


const instream = fs.createReadStream('jobs_names_significance.txt');
const outstream = new stream;

const jobs_no_significative_names = fs.createWriteStream('jobs_no_significative_names_.txt');

const jobs = []


var rl = readline.createInterface(instream, outstream);

rl.on('line', function(line) {

    jobs.push(line)
})
rl.on('close', function() {
   
    for(let i = 0; i<jobs.length; i++){
        analyzeJobsNames(jobs[i])
    }});

function analyzeJobsNames(job){

        try{
            var array = job.split(',');
            var job_significance = array[0]
            var job_id = array[1]
            var job_name = array[2]
            var file_name = array[3]
            
            if(job_significance == "not significative name"){

                if(job_name.includes("php")==true || job_id.includes("php")==true || job_name.includes("magento")==true || job_id.includes("magento")==true || job_name.includes("mariadb")==true || job_id.includes("mariadb")==true || job_name.includes("redis")==true || job_id.includes("redis")==true || job_name.includes("mysql")==true || job_id.includes("mysql")==true || job_name.includes("npm")==true || job_id.includes("npm")==true || job_name.includes("neo4j")==true || job_id.includes("neo4j")==true || job_name.includes("gradle")==true || job_id.includes("gradle")==true || job_name.includes("postgres")==true || job_id.includes("postres")==true){
                    jobs_no_significative_names.write((`technology, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                else if(job_name.includes("macOS")==true || job_id.includes("macOS")==true || job_name.includes("mac")==true || job_id.includes("mac")==true || job_name.includes("win")==true || job_id.includes("win")==true || job_name.includes("windows")==true || job_id.includes("windows")==true || job_name.includes("iOS")==true || job_id.includes("iOS")==true || job_name.includes("tvOS")==true || job_id.includes("tvOS")==true || job_name.includes("Linux")==true || job_id.includes("Linux")==true || job_name.includes("Unix")==true || job_id.includes("Unix")==true || job_name.includes("ubuntu")==true || job_id.includes("ubuntu")==true || job_name.includes("jvm")==true || job_id.includes("jvm")==true){
                    jobs_no_significative_names.write((`operating sistem, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                else if(job_name.includes("ruby")==true || job_id.includes("ruby")==true || job_name.includes("rust")==true || job_id.includes("rust")==true || job_name.includes("pypi")==true || job_id.includes("pypi")==true || job_name.includes("python")==true || job_id.includes("python")==true || job_name.includes("YAML")==true || job_id.includes("YAML")==true || job_name.includes("json")==true || job_id.includes("json")==true){
                    jobs_no_significative_names.write((`language, ${job_id}, ${job_name}, ${file_name}\n`))
                }
                else {
                    jobs_no_significative_names.write((`other, ${job_id}, ${job_name}, ${file_name}\n`))
                }
            }       
    }
        catch (error) {
            console.log(error);
          }
    }