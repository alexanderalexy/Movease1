// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect('/search')
    }
    next()
  }
  
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
      return res.redirect('/')
    }
    next()
  }
  

  const isAdmin = (req, res, next) => {
    // Not part of the model, I added it directly in the DB
    if (req.session.currentUser.role !== 'admin') {
      return res.redirect('/auth/login')
    }
    next()
  }
  

  module.exports = {
    isLoggedIn,
    isLoggedOut,
    isAdmin,
  }