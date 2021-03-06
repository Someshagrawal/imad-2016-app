var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user: 'someshagrawal',
    database: 'someshagrawal',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt) {
 var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
 return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function (req, res) {
  //var hashstr = hash (req.params.input, "try-to-hack-pass");
  var hashstr = hash(req.params.input, 'try-to-hack-pass');
  res.send(hashstr);
});

/*app.post('/signup', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      }
      else {
        alert('User successfully created: ' + username+ ".  Now Please Login");
        res.sendFile(path.join(__dirname, 'ui', 'login.html'));
      }
   });
});*/

app.post('/login', function(req, res) {
 res.sendFile(path.join(__dirname, 'ui', 'logo.png'));
 // var username1 = req.body.username;
 // var password = req.body.password;
   /*pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt);
              if (hashedPassword === dbString) {
                req.session.auth = {userId: result.rows[0].id};
                res.send('credentials correct!');
    res.sendFile(path.join(__dirname, 'ui', 'BlogPot.html'));
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });*/
});

/*app.get('/check-login', function (req, res) {
   if(req.session && req.session.auth && req.session.auth.userId) {
       pool.query('SELECT * FROM "user" WHERE id=$1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});*/


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
app.get('/ui/logo2.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'logo2.png'));
});
app.get('/ui/login.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});
app.get('/ui/login.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.jpg'));
});
app.get('/ui/signup.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'signup.jpg'));
});
app.get('/ui/signup.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'signup.html'));
});
app.get('/ui/blogpot.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blogpot.jpg'));
});
app.get('/ui/BlogPot.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'BlogPot.html'));
});

app.get('/blog/:input', function (req, res) {
 var topic = req.params.input;
 if(true/*req.session && req.session.auth && req.session.auth.userId*/)
   {
    pool.query('SELECT * FROM '+ topic, function (err, result) 
     {
       if (err) {
        res.status(500).send(err.toString());
           } 
       else{
     var blogfull = '<!DOCTYPE html><html><head><title>'+ topic +`</title><style> 
     .title{
            color: #FF0000;
            font-family: "Algerian";
            font-size: 60px;
           }
     .heading{
              color: #0000FF;
             }  
     .list{
            font-family: "Bookman Old Style";
            font-size: 30px;
           }
     .para{
            font-family: "Bel MT";
            font-size: 17px;
          }    
     </style></head><body><u><h1 class="title" align="center">`+ topic +'</h1></u><ol>';
     for(i=0;i<result.rows.length;i=i+1){
  blogfull = blogfull + '<br><br><br><h2><li class="list"><span class="heading">' + result.rows[i].Title + '</span></li></h2><p class="para">' + result.rows[i].Article +'</p><h3>Comments</h3><span class="para">' + result.rows[i].comment + '</span><h4>Your Comment:</h4><input id="T'+result.rows[i].Sno+'"  type="text"/> &emsp; <button id="B'+ result.rows[i].Sno+'">SUBMIT</button>';
     }
        blogfull =  blogfull + '</ol></body><script>';
        for(i=0;i<result.rows.length;i=i+1){
        blogfull = blogfull + 'var Con'+result.rows[i].Sno+'= document.getElementById("'+'T'+result.rows[i].Sno+'").value; var bt'+result.rows[i].Sno+'=document.getElementById("B'+result.rows[i].Sno+'");';
        }
        res.send(blogfull);
       }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
