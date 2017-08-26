var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;

var config = {
   user: 'vishal14shetty',
   database:'vishal14shetty',
   host: 'db.imad.hasura-app.io',
   port: '5432',
password: process.env.DB_PASSWORD

};

var app = express();
app.use(morgan('combined'));

/*var articles = {
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
};*/

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
            ${date.toDateString()}
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

var pool= new Pool(config);
app.get('/test-db', function (req, res)
{
// make a select request
// return a response with the results
pool.query("SELECT * FROM test", function(err, result)
{
if (err)
{
res.status(500).send (err.toString());
}
else
{ 
res.send(JSON.stringify(result.rows));
}
});
});

var counter=0;
app.get('/counter', function (req, res)
{
counter=counter+1;
res.send(counter.toString());
});
var names=[];
app.get('/submit-name', function (req, res)
{
// URL:/submit-name?name=xxxxx
// Get the name from the request
var name= req.query.name; //ToDO
names.push(name);
//JSON:JavaScript Object Notation

res.send(JSON.stringify(names)); //ToDo

});

var articles=[];
app.get('/articles/:articleName', function (req, res)
{
// articleName==article-one
// articles[articleName]= { }content object of article-one

//'SELECT * FROM article WHERE title='article-one' 
pool.query("SELECT * FROM article WHERE title=$1", [req.params.articleName], function (err,result)
{
if(err)
{
res.status(500).send (err.toString());
}
else
{
if (result.rows.length===0)
{
res.status(404).send('Article Not Found'); 
}
else
{
var articleData=result.rows[0];
res.send(createTemplate(articleData));
}
}
{

  }
});

});

/*app.get('/:articleName', function(req,res){
    //articleName == article-one
    //articles[articleName] == {} content object for article one
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
    
});*/


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res)
{
res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});