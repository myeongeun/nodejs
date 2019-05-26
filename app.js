var express = require('express');
var app = express();

var crawlingRoute = require("./route/crawling");
var algorithmRoute = require("./route/algorithm");

app.use("/crawling", crawlingRoute);
app.use("/algorithm", algorithmRoute);

app.get('/test', function (req, res) {
  res.send('Hello World! yo!');
});
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});