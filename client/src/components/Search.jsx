import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      currName: '',
      currID: ''
    };

    this.getGenres = this.getGenres.bind(this);
    this.retrieveMovies = this.retrieveMovies.bind(this);
  }

  componentDidMount() {
    this.getGenres();
    this.retrieveMovies();
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios({
      method: 'get',
      url: '/genres'
    })
      .then((genreList) => {
        //console.log('Got the genres: ', genreList.data)
        this.setState({
          genres: genreList.data,
          currName: genreList.data[0].name,
          currID: genreList.data[0].id,
        })
      })
      .catch((err) => {
        console.log('Could not retrieve genre list: ', err)
      })
  }

  retrieveMovies() {
    axios({
      method: 'get',
      url: '/search',
      params: {
        genreID: this.state.currID
      }
    })
      .then(({data}) => {
        console.log('Successfully got movies: ', data)
        // Then use passed down function to update movies: getMovies()
        this.props.getMovies(data);
      })
      .catch((err) => {
        console.log('Error in retrieving movies: ', err)
      })
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select
          value={this.state.currName}
          onChange={(e) => {
            // console.log(e.target.value)
            // console.log(document.getElementById(e.target.value).getAttribute('data-id'))
            var newName = e.target.value
            var newId = document.getElementById(newName).getAttribute('data-id')

            this.setState({
              currName: e.target.value,
              currID: newId,
            })
          }}
        >
          {this.state.genres.map((genre) => {
            return (
            <option
              value={genre.name}
              id={genre.name}
              key={genre.id}
              data-id={genre.id}
            >
                {genre.name}
            </option>
            )
          })}
        </select>
        <br/><br/>

        <button
          onClick={() => this.retrieveMovies()}
        >
          Search
        </button>

      </div>
    );
  }
}

export default Search;