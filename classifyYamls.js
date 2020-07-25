//script che classifica i file yaml già scaricati

const path = require('path');
const fs = require('fs');
const yaml = require ("yaml")

//leggo la cartella 
const directoryPath = path.join(__dirname, 'yamls');
const directory = './yamls/';
const directory_travis = './travis_yamls/';
const directory_github = './github_yamls/';
const directory_circle = './circle_yamls/';

fs.readdir(directoryPath, function (err, files) {
   
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
   //leggo tutti i file presenti all'interno della cartella 
    files.forEach(function (file) {
      
       //apro il file e faccio il parsing yaml
        const file_yaml = fs.readFileSync(directory +  file, 'utf8')
        const yaml_file = yaml.parse(file_yaml)

        // classifico i file già scaricati come travis o github
        if((file == ".travis.yml") || (yaml_file.language != null)){
            const file_travis = fs.createWriteStream(directory_travis + file);
            file_travis.write(file_yaml);
            //se l'ho classificato come travis, lo cancello dalla cartella generica yamls
            fs.unlink('./yamls/' + file, (err) => {
                if (err) throw err;
                //console.log('successfully deleted');
              });
        }
        else if (yaml_file.jobs!= null){
            const file_github =  fs.createWriteStream(directory_github + file);
            file_github.write(file_yaml);
            fs.unlink('./yamls/' + file, (err) => {
                if (err) throw err;
                //console.log('successfully deleted');
              });
        }
        else{
           // console.log("non sono ne git ne travis " + file)
        }
    });
});

//converto da yaml ad array
function yaml2array(yaml){
    var result = [];
    var keys = Object.keys(yaml);
    keys.forEach(function(key){
        result.push(yaml[key]);
    });
    return result;
}


