//script che analizza il numero dei jobs nei file di github

const path = require('path');
const fs = require('fs');
const yaml = require ("yaml")

//leggo la cartella 
const directoryPath = path.join(__dirname, 'github_yamls');
const directory = './github_yamls/';

const jobs_numbers = fs.createWriteStream('jobs_github_numbers.txt');
const jobs_ids = fs.createWriteStream('jobs_github_ids.txt');
const job_names = fs.createWriteStream('job_names.txt')

const defaultOptions = {
   
    maxAliasCount: -1,
   
  }

fs.readdir(directoryPath, function (err, files) {
   
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(async function (file_name) {
       await getJobs(file_name);
    });
});

 function getJobs(file_name){
      
       try{
        var file = fs.readFileSync(directory +  file_name, 'utf8')
        var yaml_file = yaml.parse(file, defaultOptions)
        const n_jobs = yaml2array(yaml_file.jobs).length
        jobs_numbers.write((`${n_jobs}, ${file_name} \n`))

        if(n_jobs==1){
            job_names.write((`${Object.keys(yaml_file.jobs)} \n`))
        }
        for (let i=0; i< yaml2array(yaml_file.jobs).length; i++)
        {
            jobs_ids.write((`${Object.keys(yaml_file.jobs)[i]}, ${file_name} \n`))
        }                     
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


 /* try{
        fs.unlink('./github_yamls/' + file_name, (err) => {
            if (err) throw err;
            console.log('successfully deleted');
          });
        }
          catch(error){
            console.log(error)
        }*/