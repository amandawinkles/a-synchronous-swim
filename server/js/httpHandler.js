const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'spec', 'background.jpg');
////////////////////////////////////////////////////////

//let messageQueue = null;
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
      //console.log(exports.backgroundImageFile);
      //console.log(fs.existsSync(exports.backgroundImageFile));

        fs.readFile(module.exports.backgroundImageFile, (err, data) => {
          if (err) {
            res.writeHead(404, headers);
            res.end();
            next();
          } else {
            res.writeHead(200, {
              'Content-Type': 'image/jpeg'
            });
            res.write(data, 'binary');
            res.end();
            next();
          }
        });
      }
      // fs.access(exports.backgroundImageFile, (err, fileData) => {
      //   if (err) {
      //     console.log('error accessing backgroundImageFile', err, fileData);
      //     res.writeHead(404, headers);
      //     res.end();
      //     next();
      //   } else {
      //     var img = fs.createReadStream(exports.backgroundImageFile);
      //     res.writeHead(200, {
      //       'Content-Type': 'image/jpeg'
      //     });
      //     res.write(fileData, 'binary');
      //     img.on('open', function() {
      //       img.pipe(res);
      //     });
      //     img.on('error', function(err) {
      //       res.end(err);
      //     });
      //     img.on('end', function() {
      //       res.end();
      //       next();
      //     });
      //   }
      // })

    //   if (fs.existsSync(exports.backgroundImageFile)) {
    //     var img = fs.readFileSync(exports.backgroundImageFile);
    //     res.writeHead(200, {
    //       'Content-Type': 'image/jpeg'
    //       });
    //     res.write('binary');
    //     console.log(img);
    //     res.end(img); //pass in background image file
    //     next();
    //   } else {
    //     res.writeHead(404, headers);
    //     res.end();
    //     next();
    //   }
    // }
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

  //next(); // invoke next() at the end of a request to help with testing!
  };

  // if (req.method === 'GET') {
  //   res.writeHead(200, headers);
  //   //res.write(messageQueue.dequeue());
  //   res.end();
  // } else if (req.method === 'OPTIONS') {
  //   //OPTIONS method for specifying capabilities for server
  //   //response.writeHead takes in status code, possibly statusMessage, possibly headers- returns server response
  //   res.writeHead(200, headers);
  //   res.end();
  // //}
  // }
  // // else if (req.method === 'POST') {
  // //   res.writeHead(200, headers);
  // //   //res.end();
  // // }
  // // invoke next() at the end of a request to help with testing!
  // next();

//everything after slash is endpoint
  //req.url --> verb & endpoint (verb = request type) (enpoint = /) (/ = root endpoint)
  //url / = endpoint

  //want to filter requests differently w/ endpoint of / and for background image

  //endpoint vs file path
  //create own endpoints

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

 /*
  if (req.url === '/background.jpg') {
    fs.readFile(exports.backgroundImageFile, (err, data) => {
      if (err) {
        res.writeHead(404, headers);
      } else {
        res.writeHead(200, {
          'Content-Type': 'image/jpeg'
        });
        res.write(data, 'binary');
      }
      res.end();
      next();
    });
  }

  */