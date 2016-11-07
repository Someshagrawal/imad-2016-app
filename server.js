var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var config = {
    user: 'someshagrawal',
    database: 'someshagrawal',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash (input, salt) {
 var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sah512');
 return hashed.toString('hex');
}

app.get('/hash/:input', function (req, res) {
  var hashstr = hash (req.params.input, "try-to-hack-pass");
  res.send(hashstr);
});

var pool = new Pool(config);
app.get('/test-db',function(req, res){
    pool.query('Select * from test',function(err, result){
        if(err)
        res.status(500).send(res.toString());
        else 
        res.send(JSON.stringify(result.rows));
    });
});
app.get('/articles/:articleName', function (req, res) {
    var aname = req.params.articleName;
    pool.query("SELECT * FROM article where title ='" +aname+"';" , function (err, result) {
    if(err)
    res.status(500).send(err.toString());
    else{
         if(result.rows.length === 0)
         res.status(404).send('Article not found');
         else
         {
             var articledata = result.rows[0];
             res.send(createTemplate(articledata));
         }
    }
    });    
    });
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui','main.js'));   
});
app.get('/ui/b3.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'b3.jpg'));
});
app.get('/ui/Banner.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Banner.jpg'));
});
app.get('/ui/logo.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'logo.png'));
});
app.get('/ui/logo3.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'logo3.png'));
});
app.get('/ui/ui/logo2.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'logo2.png'));
});
app.get('/ui/login.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});
app.get('/ui/ui/login.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.jpg'));
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
