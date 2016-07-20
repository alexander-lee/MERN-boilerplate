var express = require('express');
var passport = require('passport');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin'
  })
);

router.post('/logout', function(req, res){
  var name = req.user.username;
  console.log('LOGGING OUT', name);
  req.logout();
  res.redirect('/');
  req.session.notice = "You have been successfully logged out";
});




module.exports = router;
