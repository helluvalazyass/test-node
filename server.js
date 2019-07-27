const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;
const hostname = '127.0.0.1';

hbs.registerPartials(__dirname + '/views/partials')

app.set('view-engine', 'hbs');



app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('unable to log file');
    }
    
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
  // return 'test';
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('hello express');
  // res.send('<h1>hello express</h1>');
  // res.send({
  //   name: 'manish',
  //   age: 26,
  //   alphabets: [
  //     'abcd',
  //     'defg',
  //     'hijk',
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome Manish',
  });
});



app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'bad error message!'
  });
});

app.listen(port, () => {
  console.log(`express server running at ${port}`)
});