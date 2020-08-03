
const mongoose = require('mongoose');
if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI)
} else{
  mongoose.connect('mongodb://localhost:27017/badmovies', { useNewUrlParser: true });
}

/*
const db = mongoose.connection;

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
})

module.exports.db = db*/


const movieSchema = mongoose.Schema({
  popularity: Number,
  poster_path: String,
  id: {type: Number, unique: true},
  original_title: String,
  release_date: String
})

const Movie = mongoose.model('Movie', movieSchema)

const saveFavorite = ({popularity, poster_path, id, original_title, release_date}) => {
  return Movie.findOneAndUpdate(
    {
      id: id
    },
    {
      popularity,
      poster_path,
      id,
      original_title,
      release_date,
    },
    {
      upsert: true
    }).exec()
}

const deleteMovie = ({id}) => {
  return Movie.deleteOne(
    {
      id: id
    }).exec()
}

const getFavorites = () => {
  return Movie.find().exec()
}

module.exports = {
  saveFavorite,
  getFavorites,
  deleteMovie,
}