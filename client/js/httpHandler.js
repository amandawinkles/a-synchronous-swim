(function() {

  const serverUrl = 'http://127.0.0.1:3000';//endpoint will be root, becuase no other endpoint has been added to url

  //'http://127.0.0.1:3000/background.jpg' //now we have our endpoint for the image

<<<<<<< HEAD
  // TODO: build the swim command fetcher here


  //when keypress event, trigger GET request
  //in success, data will array, iterate through data array (or split if comes back as string), will call SwimTeam.move on each element
  const getRequest = function(endpoint = '') { //get request for swim command
    $.ajax({
      type: 'GET',
      url: serverUrl + endpoint,
      success: (data) => {
        console.log(data)

=======
  //'http://127.0.0.1:3000/background.jpg' //now we have our endpoint for the image

  // const swimDirections = ['up','down','left','right'];
  // const getRandomCommands = () => {
  //   return swimDirections[Math.floor(Math.random() * 4)];
  // };

  //build request that contacts server, asks for swim command, when command is passed back to client, it's given to swim team
  //setInterval to periodically request a random swim command from the server
  //separate get request for background url
  const getRequest = function(endpoint) {
    console.log(endpoint);
    console.log(serverUrl + endpoint);
    //endpoint = endpoint || '';
    $.ajax({
      url: serverUrl + endpoint, //serverUrl + endpoint
      type: 'GET',
      contentType: 'application/json',
      success: (data) => {
>>>>>>> 30e309a8b5a4ddb0b2f48ae62b4e1550eaea7202
        var commands = data.split(',')

        _.each(commands, function(currentValue) {
          SwimTeam.move(currentValue)
<<<<<<< HEAD
        })

        // SwimTeam.move(data);
        //console.log('successfully fetched swim command');
      },
      error: () => {console.error('Failed the fetch request')}
    })
  }
  //separate get request for background url


  //we need to create/use an event system instead of getting random commands
  console.log(getRequest('/background.jpg'));
  setInterval(getRequest, 3000)
=======
        });

        console.log('successfully fetched swim command');
      },
      error: () => {
        console.error('failed to fetch request');
      }
    })
  };

  console.log(getRequest('/background.jpg'));
  setInterval(function() {
    getRequest('');
    getRequest('/background.jpg');
  }, 3000);

  //setInterval(getRequest, 3000, '');
  //setInterval(getRequest, 3000);
  //setInterval(getRequest, 3000, '/background.jpg');

>>>>>>> 30e309a8b5a4ddb0b2f48ae62b4e1550eaea7202

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: 'serverUrl',
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
