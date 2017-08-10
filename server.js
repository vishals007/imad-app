var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    articleone: {
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
    articletwo: {title:   'Article Two| Vishal Shetty',
    heading: 'Article Two',
    date:    'August 11, 2016',
    content: `
       <p>
            This is the content for my Secomd Awesome article.
        </p>`
},
    articlethree: {title:   'Article one| Vishal Shetty',
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

app.get('/article-one', function(req,res){
    res.send(createTemplate(articleone));
    
});

app.get('/article-two', function(req,res){
    res.send(createTemplate(articletwo));
    
});

app.get('/article-three', function(req,res){
    res.send(createTemplate(articlethree));
    
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
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
