'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var morgan = require('morgan');

app.disable('x-powered-by');
app.use(morgan('short'));

app.use(function(req, res, next) {
  var bodyJSON = '';

  req.on('data', function(chunk) {
    bodyJSON += chunk.toString();
  });

  req.on('end', function() {
    var body;

    if (bodyJSON !== '') {
      body = JSON.parse(bodyJSON);
    }

    req.body = body;

    next();
  });
});


app.get('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var pets = JSON.parse(petsJSON);

    res.send(pets);
  });
});

app.get('/pets/:id', function(req, res){
  fs.readFile(petsPath, 'utf8', function(err, petsJSON){
    if(err){
      console.error(err.stack);
      return res.send(500);
    }
    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);

    if(id < 0 || id >= pets.length || Number.isNaN(id)){
      return res.sendStatus(404);
    }

    res.set('content-type', 'text/plain');
    res.send(pets[id]);

  });
});

app.post('/pets', function(req, res){
  fs.readFile(petsPath, 'utf8', function(readerr, petsJSON){
    if(readerr){
      console.log(readErr.stack);
      return res.sendStatus(500);
    }

    var pets = JSON.parse(petsJSON);
    var pet = {
              "age" : parseInt(req.body.age),
              "kind" : req.body.kind,
              "name" : req.body.name
            };

    if(!pet){
      res.sendStatus(400);
    }

    pets.push(pet);

    var newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, function(writeErr){
      if(writeErr){
        console.log(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('content-type', 'text/plain');
      res.send(pet);
    });
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
