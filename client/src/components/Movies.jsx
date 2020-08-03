import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props)

  }

  // Make an onClick for each list item. If the movies shown is the search results,
  // onClick add it to the database (do it in the main app, and pass down the function)
  /**
   * The base URL will look like for an image tag:
   * http://image.tmdb.org/t/p/ then you'll need a size let's say w185
   * then the poster path you got, so this is the final url
   * http://image.tmdb.org/t/p/w185//nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg 
   */

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() {
    return (
      <ul className="movies">

        {
        this.props.movies.map(movie => {
          return (
            <li
              className="movie_item"
            >
              <img src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`} />
              <div className="movie_description">
                <h2
                  onClick={() => {
                    console.log(movie)
                    this.props.updateMovie(movie)
                  }
                  }
                >{movie.original_title}</h2>
                <section className="movie_details">
                  <div className="movie_year">
                    <span className="title">Year</span>
                    <span>{movie.release_date}</span>
                  </div>
                  <div className="movie_rating">
                    <span className="title">Rating</span>
                    <span>{movie.popularity}</span>
                  </div>
                </section>
              </div>
            </li>
          )
        })}

      </ul>
    );
  }
}

export default Movies;