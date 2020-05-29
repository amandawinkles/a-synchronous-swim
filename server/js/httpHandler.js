const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

var commands = ['up', 'left', 'right', 'down'];
var randomSwimCommand = function() {
  return commands[Math.floor(Math.random() * 4)];
}


module.exports.router = (req, res, next = ()=>{}) => { //request, response
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET') {
    res.writeHead(200, headers);
    res.end(randomSwimCommand());
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  } else if (req.method === 'POST') {
    res.writeHead(200, headers);
    res.end();
  } else {

  }

  next(); // invoke next() at the end of a request to help with testing!
};
