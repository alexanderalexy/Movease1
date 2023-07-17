const express = require('express');
const { isLoggedIn, isAdmin } = require('../middleware/route-guard.middleware')
const router = express.Router();
const Movie = require('../models/Movie.model')
const uploader = require('../config/cloudinary.config.js');
/* GET home page */
router.get("/", (req, res, next) => {

  console.log(req.session)
  res.render("index")
});

// GET search page

router.get('/search',isLoggedIn, /*isAdmin,*/ (req, res, next ) => {
  //added currentUser instead of user
  res.render('search', { currentUser: req.session.currentUser })
})

// POST-Route für die Filmdatensuche

// ...

// ...

// GET-Route für die Empfehlungsseite
router.get('/recommendation', (req, res) => {
  res.render('recommendation', { movies: [], errorMessage: null });
});

// POST-Route für die Filmdatensuche
router.post('/search', async (req, res, next) => {
  try {
    const { title, director, actors, genre, length, description } = req.body;
    
    // Überprüfen, ob mindestens ein Feld ausgefüllt ist
    if (!title && !director && !actors && !genre && !length && !description) {
      throw new Error('Bitte mindestens ein Feld ausfüllen!');
    }
    
    // Filter für die Suche erstellen
    const filter = {};
    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }
    if (director) {
      filter.director = { $regex: director, $options: 'i' };
    }
    if (actors) {
      filter.actors = { $regex: actors, $options: 'i' };
    }
    if (genre) {
      filter.genre = { $regex: genre, $options: 'i' };
    }
    if (length) {
      filter.length = length;
    }
    if (description) {
      filter.description = { $regex: description, $options: 'i' };
    }
    
    // Filme basierend auf dem Filter suchen
    const movies = await Movie.find(filter);
    
    res.render('recommendation', { movies, errorMessage: null });
  } catch (err) {
    res.render('recommendation', { movies: [], errorMessage: err.message });
  }
});

// ...




//GET to add a new movie only with admin rights

router.get('/add-movie', /*isLoggedIn,*/ isAdmin, (req, res, next ) => {
  //added currentUser instead of user
 res.render('add-movie', { currentUser: req.session.currentUser })
})

// POST route to add a new movie in the DB
/*
router.post('/add-movie', (req, res, next) => {
  const { title, director, actors, genre, description, length, image } = req.body
  
  Movie.create({ title, director, actors, genre, description, length, image  })
  .then( () => res.redirect('/add-movie'))
  .catch( (err) => res.render('search'));
})
*/

router.post('/add-movie', uploader.single('image'), async (req, res, next) => {


  try {
    const { title, director, actors, genre, description, length, image } = req.body;
    console.log(req.body)
    const addMovie = await Movie.create({ title, director, actors, genre, description, length, image });
    console.log(addMovie)
    res.redirect('/add-movie');
  } catch (err) {
    console.log(err)
    res.render('add-movie');
  }
});

// ***** (D)ELETE ROUTES *****

//GET to delete a movie only with admin rights

router.get('/delete-movie',/*isLoggedIn,*/ isAdmin, (req, res, next ) => {
  //added currentUser instead of user
 res.render('delete-movie', { currentUser: req.session.currentUser })
})

// POST-Route zum Löschen eines Films
router.post('/delete-movie', async (req, res, next) => {
  try {
    const { movieId } = req.body;
    
    const deleteMovie = await Movie.findByIdAndDelete(movieId);
    
    res.redirect('/delete-movie');
  } catch (err) {
    next(err);
  }
});

// *****  UPDATE ROUTES *****

router.get('/update-movie', isAdmin, (req, res, next ) => {
  //added currentUser instead of user
 res.render('update-movie', { currentUser: req.session.currentUser })
})


// POST-Route zum Aktualisieren eines Films
router.post('/update-movie', async (req, res, next) => {
  try {
    const { search, id, title, director, actors, genre, length, description, image } = req.body;
    
    // Film suchen
    const movie = await Movie.findOneAndUpdate({ title: search }, {
      _id,
      title,
      director,
      actors,
      genre,
      length,
      description,
      image
    });
    
    if (!movie) {
      throw new Error('Movie not found');
    }
    
    res.redirect('/update-movie');
  } catch (err) {
    res.redirect('/update-movie');
  }
});


// GET-Route zum Anzeigen des Update-Formulars
/*
router.get('/update-movie', isAdmin, async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm;
    let movie;
    
    if (searchTerm) {
      movie = await Movie.findOne({ title: searchTerm });
      
      if (!movie) {
        throw new Error('Movie not found');
      }
    }
    
    res.render('update-movie', { movie: movie, searchTerm: searchTerm }, { currentUser: req.session.currentUser });
  } catch (err) {
    next(err);
  }
});

// POST-Route zum Aktualisieren des Films
router.post('/update-movie', isAdmin, async (req, res, next) => {
  try {
    const movieId = req.body.movieId;
    const { title, director, actors, genre, length, description, image } = req.body;
    
    // Film aktualisieren
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      {
        title,
        director,
        actors,
        genre,
        length,
        description,
        image
      },
      { new: true } // Das aktualisierte Dokument zurückgeben
    );
    
    if (!updatedMovie) {
      throw new Error('Movie not found');
    }
    
    res.redirect('/update-movie');
  } catch (err) {
    res.redirect('/update-movie');
  }
});

*/







//*****Navbar******/

// Route for the home page
router.get('/', (req, res) => {
  if(req.session.user) {
  res.render('index'); // Render the home.ejs file for the '/' route
  }
});

// Route for the search page
router.get('/search', (req, res) => {
  
  res.render('search'); // Render the search.ejs file for the '/search' route
  
});

// Route for the add-movie page
router.get('/add-movie', (req, res) => {
  
  res.render('add-movie'); // Render the add-movie.ejs file for the '/add-movie' route
  
});

// Route for update-movie page
router.get('/update-movie', (req, res) => {
  
  res.render('update-movie'); // Render the update-movie.ejs file for the '/update-movie' route
  
});


// Route for the delete page
router.get('/delete-movie', (req, res) => {
  
  res.render('delete-movie'); // Render the contact.ejs file for the '/contact' route
  
});







module.exports = router
