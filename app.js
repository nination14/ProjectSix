/** Setting up Server, Routes and Middleware */
// Creating an app.js is the MAIN file that holds Express application


//*Required Dependencies*//
/** Server(express), Data (.json), & App(express) */
const path = require('path');
const { projects } = require("./data.json");
const express = require('express'); //In order to use Express we must add it using Node require statement.
//Module is call Express and its the parameter I pass into the require function.Express is the name variable that I assign the required module to.
const app = express(); //This app is the central part of our application. The express function returns an Express application


//*Setting Middleware*//
//Plug is a template Engine for Node. It translates to HTML.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); //Setting "view engine" to "pug"
app.use('/static', express.static('public')); //Use a "static" route and "express.static" method to serve the static files locaed in the "public" folder.
//app.use(bodyParser.urlencoded({ extended: false})); //Not needed since its only for POST request 

//*Setting Routes*// 
//Path user takes to access data on a server//
app.get('/', (req, res) => { //To indicate the site's root route we use slash as our 1st parameter aka location parameter
  console.log ('in app');
  console.log (projects);
  res.render('index',  { projects: projects } ); //The object projects is what is passing to the template and naming it projects
}); // 2nd parameter is an anonymous callback function and take 2 parameters a request object & responce object 

app.get('/about', (req, res) => {
  res.render('about');
});

//*Project route with ID parameter
app.get('/project/:id', (req, res) => {
  const index = req.params.id - 1;
  const project = projects[index]; 
  res.render('project', { project });
});

//*Error Handlers *//
//If  the route is non-existent or if a request fails for whatever reason, this function will handle the error in a user friendly way.
app.use((req, res, next) => {
  const err = new Error('Oh no! This Page is Not Found'); //Created a custom error object and storing it in Errors
  err.status = 404;
  next(err); // Passing in the error object as an argument to the next function call.
});


app.use((err, req, res, next) => {
  res.locals.error = err;
  let status = err.status;
  if (status === 'Internal Server Error') {
    status = 500;
    res.status(status);
  } 
  res.render('error');
});

//*Listener *//
//const port = 300; //Setup the development server using the listener method & give a parameter the port # 3000
//This code will create a server and when I run it, the server will run on my machine and I can send request through a special URL called localhost
app.listen(3000, console.log("Ahirina's App is listening on port 3000")); //console log string that specifies which port the app is listening to


