const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
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

  if (req.method === 'GET') {
    res.writeHead(200, headers);
    //response.write sends back a chunk of the responsive body, may be called multiple x to provide successive parts of the body, takes in chunk, possibly encoding, callback- returns a boolean
    //loop through messages, messageQueue.dequeue() for each element in messages array
    //if messageQueue.dequeue() returns undefined, res.end()
    //assign var to dequeue to use it

    for (var i = messageQueue.dequeue(); i !== undefined; i = messageQueue.dequeue()) {
      res.write( i + ',');
    }

    // do {
    //   i = i++;
    //  i = messageQueue.dequeue()
    // } while (i !== undefined)

    res.end();
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  } else if (req.method === 'POST') {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(200, headers);
    res.end();
  }

  next(); // invoke next() at the end of a request to help with testing!
};
