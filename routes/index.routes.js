const express = require('express');
const { isLoggedIn, isAdmin, isLoggedOut } = require('../middleware/route-guard.middleware')
const router = express.Router();
const Movie = require('../models/Movie.model')
const uploader = require('../config/cloudinary.config.js');
/* GET home page */
router.get("/", (req, res, next) => {

  console.log("LOOK HERE", req.session)
  res.render("index")
});



// GET search page

router.get('/search',isLoggedIn, /*isAdmin,*/ (req, res, next ) => {
  //added currentUser instead of user
  res.render('search', { currentUser: req.session.currentUser })
})

// logout route
router.get("/logout", (req, res, next) => {
  console.log('LOGOUT')
  req.session.destroy((err) => {
      if (err) {
          console.log(err);
      }
      res.redirect("/");
  });
});



// GET-Route Recommondation
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



//GET to add a new movie only with admin rights

router.get('/add-movie', /*isLoggedIn,*/ isAdmin, (req, res, next ) => {
  //added currentUser instead of user
 res.render('add-movie', { currentUser: req.session.currentUser })
})


router.post('/add-movie', uploader.single('image'), async (req, res, next) => {
console.log(req.file)
const image = req.file.path
const { title, director, actors, genre, description, length } = req.body;
const payload = {title, director, actors, genre, description, length, image}
  try {
    const addMovie = await Movie.create(payload);
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

// POST-Route zum Löschen eines Films
/*
router.post('/delete-movie', async (req, res, next) => {
  try {
    const { title } = req.body;
    
    const deleteMovie = await Movie.findOneAndDelete({ title: title });
    
    if (!deleteMovie) {
      throw new Error('Movie not found');
    }
    
    res.redirect('/delete-movie');
  } catch (err) {
    next(err);
  }
});
*/



// *****  UPDATE ROUTES *****

router.get('/update-movie/:id', isAdmin, async (req, res, next ) => { 
  const { id } = req.params;
  console.log(id)
  //added currentUser instead of user
  try {
    const foundMovie = await Movie.findById(id)
    console.log(foundMovie)
    res.render('update-movie', { currentUser: req.session.currentUser, movie: foundMovie})
  } catch (error) {
    console.log(error)
  }
})



// POST-Route zum Aktualisieren eines Films

router.post('/update-movie/:id', uploader.single("image"), async (req, res, next) => {
  const { id } = req.params;
  try {
    const { title, director, actors, genre, length, description} = req.body;
    
    // Film suchen
    console.log(req.body)
    const movie = await Movie.findByIdAndUpdate( id, {
  
      title,
      director,
      actors,
      genre,
      length,
      description,
    
    });
    
    res.redirect('/search');
  } catch (err) {
    res.redirect(`/update-movie/${id}`);
  }
});



//*****Navbar******/

// Route for the home page
router.get('/', (req, res) => {
  //if(req.session.user) {
  res.render('index'); // Render the home.ejs file for the '/' route
  //}
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
