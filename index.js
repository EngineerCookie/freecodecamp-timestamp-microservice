// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api", dateCheck, function (req, res) {
  res.json(res.locals.dateObj)
})

app.get("/api/:date", dateCheck, function (req, res) {
  res.locals.error = { "error" : "Invalid Date" };
  if (res.locals.dateObj.utc == "Invalid Date") {
    res.json(res.locals.error);
  } else {
  res.json(res.locals.dateObj);}
});

function dateCheck(req, res, next) {
  res.locals.dateObj = { "unix": undefined, "utc": undefined };
  let regex = /^[0-9]+$/g; //detecs only numbahs;
  let paramDate;
  if (req.params.date == undefined) {
    paramDate = Date();
    console.log('hola babe')
  } else {
    if (regex.test(req.params.date) == true) { //format date to either number or string
      paramDate = +req.params.date;
    } else { paramDate = `${req.params.date}` };
  }
  res.locals.dateObj.utc = new Date(paramDate).toUTCString();
  res.locals.dateObj.unix = new Date(paramDate).getTime();
  //let localTime = new Date(1451001600000);
  //res.locals.dateObj.utc = new Date(1451001600000).toUTCString();
  //res.locals.dateObj.utc = new Date(dateString).toUTCString();
  //res.locals.dateObj.utc = new Date(localTime).toUTCString();

  //to get utc = new Date(res.locals.dateObj.unix).toUTCString();
  //To get unix = new Date(testnum).getTime();
  next();
}


// listen for requests :)
var listener = app.listen(process.env.PORT || 52300, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


/*
- A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number).

- A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT.

- A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }.

- Your project can handle dates that can be successfully parsed by new Date(date_string).

- If the input date string is invalid, the API returns an object having the structure { error : "Invalid Date" }.

- An empty date parameter should return the current time in a JSON object with a unix key.

- An empty date parameter should return the current time in a JSON object with a utc key.

*/