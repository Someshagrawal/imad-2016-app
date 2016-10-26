var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

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

var pool = new Pool(config);
app.get('/test-db',function(req, res){
    pool.query('Select * from test',function(err, result){
        if(err)
        res.status(500).send(res.toString());
        else 
        res.send(JSON.stringify(result.rows));
    });
});
app.get('/articles/articleName', function (req, res) {
    //articleName == Article-one
    pool.query("SELECT * FROM article where title=" + req.params.articleName, function(err,result){
    if(err)
    res.status(500).send(err.toString());
    else{
        
         if(res.rows.length===0)
         res.status(404).send('article not found');
         else
         {
             var articledata = res.rows[0];
             res.send(createTemplate(articledata));
         }
    }
        
    });
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
