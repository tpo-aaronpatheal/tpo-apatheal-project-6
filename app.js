//variables declared to require the appropriate dependencies. 
const express = require('express');
const projectData = require('./data.json');

//This is the convention used for creating a new application.
const app = express();

//using the static route and the express.static method to serve the static files located in the public folder. Calls the statis middleware.
app.use('/static', express.static('public'));

//setting view engine to pug
app.set('view engine', 'pug');

//This route renders the homepage with the locals set to data.projects. 
app.get('/',(req, res) => {
    res.locals = projectData;
    res.render('index');
});

//This route renders the "about" page.
app.get('/about', (req, res) => {
    res.render('about');
});

//Dynamic projects route that will render a specific version of the Pug project template to show off each project. 
app.get('/project/:id', (req, res, next) => {
    const projectNumber = req.params.id;
});

//This middleware will be responsinble for creating the error object. If a request makes it this far with no match, then this will catch the error and trigger
//a custom message. 
app.use((req, res, next) => {
    const err = new Error("Unfortunately we can't find what you are looking for.");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
     res.locals.error = err;
     res.status(500);
     res.render('error');
 });

//Starts the server and listens on port 3000. The string that logs to the console lets you know what localhost the application is running on. 
app.listen(3000, () => { 
    console.log('This application is running on localhost: 3000!');
});