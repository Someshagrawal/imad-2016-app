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
/*var articles = {
    'article-one': {
        id: '1',
        title: 'article-one',
        heading: 'Article One',
        date: 'oct 20, 2016 ',
        content: '<p>This is my frist article</p>'
                 } ,
    'article-two': {
        id: '2',
        title: 'article-two',
        heading: 'Article Two',
        date: 'oct 21, 2016 ',
        content: '<p>This is my Second article</p>'
    } ,
    'article-three': {
        id: '3',
        title: 'article-three',
        heading: 'Article Three',
        date: 'oct 22, 2016 ',
        content: '<p>This is my Third article</p>'
    }
};*/

function createTemplate (data) 

function hash (input,salt){
 var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sah512');
 return hashed.toString('hex');
}

app.get('/hash', function (req, res) {
  //var hash = req.params.input;
  //res.send("hash");
  document.write("yes it works");
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
