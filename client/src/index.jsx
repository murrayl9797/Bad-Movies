import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import axios from 'axios';
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };

    // you might have to do something important here!
    this.swapFavorites = this.swapFavorites.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.updateFavorites = this.updateFavorites.bind(this);
  }

  componentDidMount() {
    //Get favorites from database
    this.updateFavorites();
  }

  updateFavorites() {
    axios({
      method: 'get',
      url: '/getfavs'
    })
      .then((favorites) => {
        console.log("Retrieved favorites: ", favorites.data)
        // Then set this.state.favorites
        this.setState({
          favorites: favorites.data
        })
      })
      .catch((err) => {
        console.log("Did not get favorites: ", err)
      })
  }

  getMovies(moviesFromAPI) {
    // make an axios request to your server on the GET SEARCH endpoint
    this.setState({
      movies: moviesFromAPI
    })
  }

  saveMovie(movie) {
    // same as above but do something diff
    // send to server
    axios({
      method: 'post',
      url: '/save',
      data: {
        movie: movie
      }
    })
      .then((respData) => {
        console.log('Saved movie successfully :', respData)
        this.updateFavorites()
      })
      .catch((err) => {
        console.log('Did not correctly save movie: ', err)
      })
  }

  deleteMovie(movie) {
    // same as above but do something diff
    axios({
      method: 'post',
      url: '/delete',
      data: {
        movie: movie
      }
    })
      .then((resp) => {
        console.log('Successfully removed movie: ', resp)
        this.updateFavorites()
      })
      .catch((err) => {
        console.log('Could not delete successfully')
      })
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header>

        <div className="main">
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
            getMovies={this.getMovies}
          />
          <Movies
            movies={this.state.showFaves ? this.state.favorites : this.state.movies}
            showFaves={this.state.showFaves}
            updateMovie={this.state.showFaves ? this.deleteMovie : this.saveMovie }
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));