

const http = require('http');
const fs = require('fs');


const server = http.createServer((request, response) => {
  let path = request.url.split("/");
  let index = path[2];
  console.log(path);
 if (request.url === '/pets') {
     fs.readFile('pets.json', 'utf8', (err, data)=>{
       response.end(data);
     })
     response.statusCode = 200;
   } else if (request.url === `/pets/${index}`){
     fs.readFile("pets.json", "utf8", (err, data)=>{
       let pets = JSON.parse(data)[index]
       console.log(pets);
       if(pets){
         response.end(JSON.stringify(pets));
       }else{
         response.statusCode = 404;
         response.end("This is not the page you are looking for.");
       };

     })
     response.statusCode = 200;
   }
}).listen(8000);
