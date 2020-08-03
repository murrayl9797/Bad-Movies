var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");

var app = express();

// Sign up and get your moviedb API key here:
// https://www.themoviedb.org/account/signup

//Helpers
var { getGenres, getMoviesAPI } = require("./helpers/apiHelpers.js");
var { getFavorites, saveFavorite, deleteMovie } = require("../db/mongodb");

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + "/../client/dist"));

//***********************************************************************************************************************

/*
Use the routes below to build your application:

|      URL         | HTTP Verb |  Result                                                     |
| :------------:   | :-------: |------------------------------------------------------:      |
|     /genres      |   GET     |  Respond with JSON of all genres                            |
|     /search      |   GET     |  Respond with JSON of all movies by the selected genre      |
|     /save        |   POST    |  Save selected movie as favorite                            |
|     /delete      |   POST    |  Remove selected movie as favorite                          |

*/

//TODO: Pick one of the two route options below:
//OPTION 1: Use regular routes, where endpoints are pre-defined on this page, you do NOT need to refer to /server/routes/movieRoutes.js file
//OPTION 2: Use Express Router, where the routes are defined under /server/routes/movieRoutes.js file

//***********************************************************************************************************************
//OPTION 1: Use regular routes;
//If you are using OPTION 1, you do not need routes>movieRoutes.js file

app.get("/genres", function(req, res) {
  // make an axios request to get the official list of genres from themoviedb
  // use this endpoint. you will need your API key from signup: https://api.themoviedb.org/3/genre/movie/list
  getGenres()
    .then(({data}) => {
      //console.log(data.genres)
      res.status(200).send(data.genres)
    })
    .catch((err) => {
      console.log("Couldn't get genre list: ", err)
      res.sendStatus(404);
    })
});

app.get("/search", function(req, res) {
  // use this endpoint to search for movies by genres (using API key): https://api.themoviedb.org/3/discover/movie
  // and sort them by votes (worst first) using the search parameters in themoviedb API
  // do NOT save the results into the database; render results directly on the page
  console.log(req.query.genreID)
  getMoviesAPI(req.query.genreID)
    .then(({data}) => {
      //console.log('Successfully got movies: ', data.results)
      res.status(200).send(data.results)
    })
    .catch((err) => {
      console.log('Could not get movies from API: ', err)
      res.sendStatus(404)
    });
});

app.post("/save", function(req, res) {
  //save movie as favorite into the database
  console.log('Receieved save request :', req.body)
  saveFavorite(req.body.movie)
    .then((insertInfo) => {
      console.log('Inserted fav movie correctly :', insertInfo)
      res.sendStatus(201)
    })
    .catch((err) => {
      console.log('Could not insert favorite correctly: ', err)
      res.sendStatus(404)
    })
});

app.post("/delete", function(req, res) {
  //remove movie from favorites into the database
  console.log('Trying to delete movie')
  deleteMovie(req.body.movie)
    .then((deleteInfo) => {
      console.log('Successfully deleted :', deleteInfo)
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Could not delete movie: ', err)
      res.sendStatus(404)
    })
});

app.get("/getfavs", function(req, res) {
  //retrieve movies from favorites in the database
  console.log('Recieved get request for favorites')
  getFavorites()
    .then((results) => {
      console.log('Retrieved favorites :', results)
      // Send them back
      res.status(200).send(results)
    })
    .catch((err) => {
      console.log('Could not retrieve favorites :', err)
      res.sendStatus(404)
    })
});


//***********************************************************************************************************************
//OPTION 2: Use Express Router

//IF you decide to go with this OPTION 2, delete OPTION 1 to continue

//Routes
const movieRoutes = require("./routes/movieRoutes.js");

//Use routes
app.use("/movies", movieRoutes);

app.listen(3000, function() {
  console.log("listening on port 3000!");
});
