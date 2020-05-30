const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');//not being recognized as correct file path
////////////////////////////////////////////////////////

let messageQueueStart = null;

module.exports.initialize = (queue) => {
  messageQueueStart = queue;
};

var commands = ['up', 'left', 'right', 'down'];
var randomSwimCommand = () => {
  return commands[Math.floor(Math.random() * 4)];
}

//trigger get request getting sent in from server
module.exports.router = (req, res, next = ()=>{}) => { //request, response
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  //everything after slash is endpoint
  //req.url --> verb & endpoint (verb = request type) (enpoint = /) (/ = root endpoint)
  //url / = endpoint

  //want to filter requests differently w/ endpoint of / and for background image

  //endpoint vs file path
  //create own endpoints

  if (req.method === 'GET') {
    //create chunk to run for specific endpoint
    if (req.url === '/') {
      res.writeHead(200, headers);
      for (var i = messageQueue.dequeue(); i !== undefined; i = messageQueue.dequeue()) {
        res.write( i + ',');
      }
      res.end();
      next();
    } else if (req.url === '/background.jpg') {

      console.log(exports.backgroundImageFile);
      console.log(fs.existsSync(exports.backgroundImageFile));

      if (fs.existsSync(exports.backgroundImageFile)) {
        var img = fs.readFileSync(exports.backgroundImageFile);
        res.writeHead(200, {
          'Content-Type': 'image/jpeg'
          });
        console.log(img);
        res.end(img); //pass in background image file
        next();
      } else {
        res.writeHead(404, headers);
        res.end();
        next();
      }
    }
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next();
  } else if (req.method === 'POST') {
    res.writeHead(200, headers);
    res.end();
    next();
  } else {
    res.writeHead(200, headers);
    res.end();
    next();
  }

  next(); // invoke next() at the end of a request to help with testing!
};

//response.write sends back a chunk of the responsive body, may be called multiple x to provide successive parts of the body, takes in chunk, possibly encoding, callback- returns a boolean
//loop through messages, messageQueue.dequeue() for each element in messages array
//if messageQueue.dequeue() returns undefined, res.end()
//assign var to dequeue to use it