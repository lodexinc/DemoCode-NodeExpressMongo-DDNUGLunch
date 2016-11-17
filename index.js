// Tim Rayburn
// VP of Consulting at Improving
//
// Inagural Meeting on DDNUG Downtown Lunch
//
// tim@timrayburn.net
// 817-760-0002 (yes, really)
// @trayburn on Twitter

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://localhost/ddnug-lunch');

var Widget = mongoose.model("widget", {
  name: String
});

app.use(bodyParser.json());

app.get('/widgets', (req, res) => {
  Widget.find({}, (err, data) =>
  {
    res.send(data);
  });
});


app.post('/widgets', (req, res) => {
  var widg = new Widget(req.body);
  widg.save((err) => {
    if ( err != null ) {
      res.sendStatus(500);
    } else {
      res.send(widg);
    }
  })
});


app.listen(4000, () => {
  console.log("Listening...");
});
