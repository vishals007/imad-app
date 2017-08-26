var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var pool = new Pool(config);

var config = {
    user: 'vishal14shetty',
    db: 'vishal14shetty',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
    title:   'Article one| Vishal Shetty',
    heading: 'Article one',
    date:    'August 10, 2016',
    content: `
       <p>
            This is the content for my first Awesome article.This is the content for my first Awesome article.This is the content for my first.Awesome article.This is the content for my first Awesome articleThis is the content for my first Awesome article.This is the content for my first Awesome article.
        </p>
        <p>
            This is the content for my first Awesome article.This is the content for my first Awesome article.This is the content for my first.Awesome article.This is the content for my first Awesome articleThis is the content for my first Awesome article.This is the content for my first Awesome article.
        </p>
        <p>
            This is the content for my first Awesome article.This is the content for my first Awesome article.This is the content for my first.Awesome article.This is the content for my first Awesome articleThis is the content for my first Awesome article.This is the content for my first Awesome article.
        </p>`
},
    'article-two': {title:   'Article Two| Vishal Shetty',
    heading: 'Article Two',
    date:    'August 11, 2016',
    content: `
       <p>
            This is the content for my Secomd Awesome article.
        </p>`
},
    'article-three': {title:   'Article one| Vishal Shetty',
    heading: 'Article Three',
    date:    'August 13, 2016',
    content: `
       <p>
            This is the content for my Third Awesome article.
        </p>`
}
};

function createTemplate(data) {
     var title =data.tile;
     var date  =data.date;
     var heading =data.heading;
     var content =data.content;
        var htmlTemplate = `
    <html>
       <head>
         <title>
            ${title}
        </title>
        <meta name="viewport"  content="width=device-width,  initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
       </head>    
       <body>
          <div class="container">
           <div>
              <a href="/">home</a>
         </div>
         <hr/>
         <h3>
            ${heading}
        </h3> 
        <div>
            ${date}
        </div>
        <div>
            ${content}
           </div>
        </diV>  
        
       </body>
    </html>
   `;
   return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter =0;
app.get('/counter',function(req,res) {
    counter = counter + 1;
    res.send(counter.tostring());
});

app.get('/:articleName', function(req,res){
    //articleName == article-one
    //articles[articleName] == {} content object for article one
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

var pool = new Pool(config);
app.get('/test-db', function(req,res) {
    //make a select request
    //return a response with the result
    pool.querry('SELECT * FROM test',function(err,result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }
  });
});


                                                /*app.get('/article-two', function(req,res){
                                                    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
                                                    
                                                });
                                                
                                                app.get('/article-three', function(req,res){
                                                    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
                                                    
                                                });*/

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
