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
    res.locals.data = projectData;
    res.render('index');
});

//This route renders the "about" page.
app.get('/about', (req, res) => {
    res.render('about');
});

//Dynamic projects route that will render a specific version of the Pug project template to show off each project. 
app.get('/project/:id', (req, res, next) => {
    res.locals.data = projectData;
    const projectNumber = req.params.id;
    const project = projectData.projects[projectNumber];
    res.render(('project'), { project });
});

//This middleware will be responsinble for creating the error object. If a request makes it this far with no match, then this will catch the error and trigger
//a custom message. 
app.use((req, res, next) => {
        const err = new Error("Unfortunately we can't find what you are looking for.");
        err.status = 404;
        //res.render('page-not-found');
        next(err);
    });

//This middleware is responsible for creating a general error message if there is no err.status set. In this case, if the error is not 404.
    app.use((err, req, res, next) => {
        if(err.status === 404){
            console.log('The page seems to be missing')
            res.locals.error = err;
            err.status = 404;
            err.message = new Error("Unfortunately we can't find what you are looking for.");
            res.render('page-not-found', { err });
        } else if(!err.status){
            console.log('Oops something just is not working right');
            err.message = new Error("Oh no! Looks like something went wrong. Can't technology just be the darndest thing?");
            err.status = 500;
            res.render('error', { err });
        }
    });

//Starts the server and listens on port 3000. The string that logs to the console lets you know what localhost the application is running on. 
app.listen(3000, () => { 
    console.log('This application is running on localhost: 3000!');
});