const fs = require ("fs");
const readline = require('readline');
const stream = require('stream');
const xl = require('excel4node');
const request = require("request");
const yaml = require ("yaml")
const defaultOptions = {
   
    maxAliasCount: -1,
   
  }

const paths = []
const technologies = []


//vedo che tipo di CI tool è usato (solo dal nome o dal percorso) e classifico, poi scrivo in un file excel

function getTechn(){

    var instream = fs.createReadStream('yamls_paths_10.txt');
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);
    rl.on('line', function(line) {
        paths.push(line);
    })
    rl.on('close', async  function() {
        excel()
    });
       
}

function yaml2array(yaml){
    var result = [];
    var keys = Object.keys(yaml);
    keys.forEach(function(key){
        result.push(yaml[key]);
    });
    return result;
}

function excel(){
    var wb = new xl.Workbook();
         var ws = wb.addWorksheet('File yaml');
         var style = wb.createStyle({
            font: {
               color: '#000000',
               size: 10,
            }
         });
         ws.cell(1, 1)
         .string('Yaml path')
         .style(style);

         ws.cell(1, 2)
         .string('Technology')
         .style(style);

      for (i = 0; i < paths.length; i++) {
         ws.cell(i+2, 1)
         .string(paths[i])
         .style(style);

         if(paths[i].includes(".circleci/config.yml")==true){
            //techn_file.write(`circle, ${paths[i]} \n`);
            technologies[i] = "circle";
        }
        

        else if(await isTravisFile(paths[i])==true){
            technologies[i] = "travis";
            //techn_file.write(`travis, ${paths[i]} \n`);
        }
        
        else if(paths[i].includes(".github/workflows")==true){
            //techn_file.write(`github actions, ${paths[i]} \n`);
            technologies[i] = "github";
        }
        else if(paths[i].includes("appveyor")==true){
            //techn_file.write(`github actions, ${paths[i]} \n`);
            technologies[i] = "appveyor";
        }
        else{
            //techn_file.write(`boh, ${paths[i]} \n`);
            technologies[i] = "-";
        }


         ws.cell(i+2, 2)
         .string(technologies[i])
         .style(style);
      }
   wb.write('Yaml_class.xlsx');
}

function isTravisFile(durl){
    var travis = false;
    request.get(durl, async function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var file = body;
            try{
                var yaml_file = yaml.parse(file, defaultOptions)
                if(yaml_file.language!= null){
                    travis = true;
                }
    
            }
            catch(e){
                console.log(e)      
            }
        }
    });
    return travis;
}

getTechn()