import express from 'express';
import passport from 'passport';

const router = express.Router();
const loginHelper = require('../utils/login-helper.js');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', function(req, res, next) {
  loginHelper('local', req, res, next);
});

router.get('/logout', function(req, res, next) {
  if(req.isAuthenticated()){
    req.logout();
  }

  res.redirect('/');
});

// Google Auth
router.get('/auth/google',
  passport.authenticate('google', {scope: ['profile', 'email']})
);

// Google Callback (After authenticating)
router.get('/auth/google/callback',
  passport.authenticate('google', {failureRedirect: '/login', successRedirect: '/'})
);

export default router;
