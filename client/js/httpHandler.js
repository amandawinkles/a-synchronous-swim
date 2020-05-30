(function() {

  const serverUrl = 'http://127.0.0.1:3000';//endpoint will be root, becuase no other endpoint has been added to url

  //'http://127.0.0.1:3000/background.jpg' //now we have our endpoint for the image

  // TODO: build the swim command fetcher here


  //when keypress event, trigger GET request
  //in success, data will array, iterate through data array (or split if comes back as string), will call SwimTeam.move on each element
  const getRequest = function(endpoint = '') { //get request for swim command
    $.ajax({
      type: 'GET',
      url: serverUrl + endpoint,
      success: (data) => {
        console.log(data)

        var commands = data.split(',')

        _.each(commands, function(currentValue) {
          SwimTeam.move(currentValue)
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
      url: 'FILL_ME_IN',
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
