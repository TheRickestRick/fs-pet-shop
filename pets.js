const fs = require('fs');

if(process.argv[2] === undefined){
  console.log("Usage: node pets.js [read | create | update | destroy]");
}

if(process.argv[2] === "read"){
  fs.readFile('./pets.json', "utf8", (err, data) =>{
      if(err){
        console.error(err);
      }else{

      let pets = JSON.parse(data);
      if(process.argv[3]){
        console.log(pets[process.argv[3]]);
      }else{
        console.log(pets);
      }
    }
  });
}

if(process.argv[2] === "create"){
  fs.readFile("./pets.json", "utf8", (err,data) =>{
    if(process.argv[5] === undefined){
      console.log("Usage: node pets.js create AGE KIND NAME");
    }else{
      let pet = {
                age : parseInt(process.argv[3]),
                kind : process.argv[4],
                name : process.argv[5]
              };
      console.log(pet);
      let parsedPets = JSON.parse(data);
      parsedPets.push(pet);
      console.log(parsedPets);
      fs.writeFile("./pets.json", JSON.stringify(parsedPets), function(err){
        console.error(err);
      })
    }
  });
}

if(process.argv[2] === "update"){
  fs.readFile("./pets.json", "utf8", (err,data) =>{
    if(process.argv[6] === undefined){
      console.log("Usage: node pets.js update INDEX AGE KIND NAME");
    }else{
      let pets = JSON.parse(data);
       pets[process.argv[3]] = {
                age : parseInt(process.argv[4]),
                kind : process.argv[5],
                name : process.argv[6]
              };
      fs.writeFile("./pets.json", JSON.stringify(pets), function(err){
        console.error(err);
      })
    }
  });
}

if(process.argv[2] === "destroy"){
  fs.readFile("./pets.json", "utf8", (err,data) => {
    if(process.argv[3] === undefined){
      console.log("Usage: node pets.js destroy INDEX");
    }else{
      let pets = JSON.parse(data);
      pets.splice(process.argv[3],1);
      fs.writeFile("./pets.json", JSON.stringify(pets), function(err){
        console.error(err);
      })
    }
  });
}
