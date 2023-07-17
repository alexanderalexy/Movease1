const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const movieSchema = new Schema(
  {
    
      title: String,
      director: String,
      actors: [String],
      genre: String,
      description: String,
      length: Number,
      image: String,
      
    
    },
  
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;
