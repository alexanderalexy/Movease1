
const router = require('express').Router();
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.middleware');
//const express = require('express')
const User = require('../models/User.model')
const bcrypt = require("bcryptjs")
//const router = express.Router()


/* GET Signup page */
router.get('/signup', isLoggedOut, (req, res, next) => {
    res.render('auth/signup')
  })

  router.post('/signup', async (req, res) => {
    const payload = {...req.body};
    delete payload.password;
    const salt = bcrypt.genSaltSync(13)
    payload.passwordHash = bcrypt.hashSync(req.body.password, salt)

    try {
        const newUser = await User.create(payload)
        console.log('New User:', newUser)
        res.redirect('/auth/login')
    } catch (error) {
            console.log(error)
        }
    })


    //login rout

    router.get('/login', (req, res) => {
        res.render('auth/login')
    }
    )

    //login router post
    router.post('/login', async (req, res) => {
        //handle no user or incorrect password
        // 1. check fo the username in DB
       //console.log("here is the body", req.body)
       console.log('SESSION =====> ', req.session);
       try {
       const foundUser = await User.findOne({username: req.body.username});
       //console.log("Found User", foundUser);
       //Check if you find the user, compare the password to the passwordHash in the DB
       if(foundUser){ 
        let passwordMatch = bcrypt.compareSync(req.body.password, foundUser.passwordHash)
        //console.log('do passwords match', passwordMatch)
        //Check if there is a user and the password matches, then redirect to profile and create a session
        if(passwordMatch){
        foundUser.passwordHash = '****'
        req.session.currentUser = foundUser;
        req.session.currentUser.isLoggedIn = true;
        res.redirect('/search')
        }else {
         res.render('auth/login', { errorMessage: 'Try again please'})
        }
       }
       else{
        res.render('auth/login', { errorMessage : "Invalid inputs" });
       }
       } catch (error) {
            console.log(error)
       }
       
    })




  module.exports = router;