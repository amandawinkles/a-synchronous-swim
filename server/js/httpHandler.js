const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
//messageQueue used later to send commands to client
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

//write helper func that will randomly choose a swim command //server should be returning a randomly selected swim command when it gets a GET request //data should be coming from random swim command function?
const swimDirections = ['up','down','left','right'];
const getRandomCommands = () => {
  return swimDirections[Math.floor(Math.random() * 4)];
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  /*
  if (req.url === '/background.jpg') {
    fs.readFile(module.exports.backgroundImageFile, (err, fileData) => {
      if (err) {
        res.writeHead(404);
      } else {
        res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Content-Length': fileData.length
        });
        res.write(fileData, 'binary');
      }
      res.end();
      next();
    });
  }

  */

  // res.writeHead(200, headers);
  // res.end();
  // next(); // invoke next() at the end of a request to help with testing!

  if (req.method === 'GET') {
    res.writeHead(200, headers);
    //res.write(messageQueue.dequeue());
    res.end();
  } else if (req.method === 'OPTIONS') {
    //OPTIONS method for specifying capabilities for server
    //response.writeHead takes in status code, possibly statusMessage, possibly headers- returns server response
    res.writeHead(200, headers);
    res.end();
  //}
  }
  // else if (req.method === 'POST') {
  //   res.writeHead(200, headers);
  //   //res.end();
  // }
  // invoke next() at the end of a request to help with testing!
  next();
};



//response.write sends back a chunk of the responsive body, may be called multiple x to provide successive parts of the body, takes in chunk, possibly encoding, callback- returns a boolean
//res.write(messageQueue.dequeue());
//res.end(getRandomCommands());

/*
module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  // res.writeHead(200, headers);
  // res.end();
  // next(); // invoke next() at the end of a request to help with testing!

  if (req.method === 'GET') {
    res.writeHead(200, headers);
    res.end(getRandomCommands());
  } else if (req.method === 'OPTIONS') {
    //OPTIONS method for specifying capabilities for server
    //res.writeHead(200, headers);
    res.end();
  }
};
*/