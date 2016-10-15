var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
 counter=0;
 app.get('/counter',function (req,res) {
counter=counter+1;
res.send(counter.toString());
 });
app.get('/New2',function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'New2.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/20150928_220044.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', '20150928_220044.jpg'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
