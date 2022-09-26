// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date_info",  function (req, res){
  let dateInfo = req.params.date_info;
  dateValidation = /[a-zA-z]/.test(dateInfo)
  if (dateValidation){
    res.json({error: "Invalid Characters entered"})
  } else {
    if (dateInfo.includes('-')) {
      let dateobject = new Date(dateInfo)
      if (dateobject.toString() === "Invalid Date") {
        res.json({error: "Invalid Date"})
      } else {
        res.json({unix: dateobject.valueOf(), utc: dateobject.toUTCString()})
      }
    } else {
      if (/\d/.test(dateInfo)){
        let dateInt = parseInt(dateInfo);
        let dateString = new Date(dateInt).toUTCString()
        res.json({unix: dateInfo, utc: dateString})
      } else {
        res.json({error: "Invalid Characters entered"})
      }
    }

    }
});
  
  //res.json({test: dateValidation});
  
//);



// listen for requests :)
/*
var listener = app.listen(process.env.PORT, function () {

  console.log('Your app is listening on port ' + listener.address().port);
});

*/
const listener = app.listen(5000, function(){
  console.log('your app is listening to port' + listener.address().port);
})