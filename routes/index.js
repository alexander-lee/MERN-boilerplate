var express = require('express');
var router = express.Router();

var authenticate = require('../utils/AuthHelper.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', function(req, res, next){
  authenticate(req, res, next);
});

router.post('/logout', function(req, res){
  var name = req.user.username;
  console.log('LOGGING OUT', name);
  req.logout();
  res.redirect('/');
  req.session.notice = "You have been successfully logged out";
});




module.exports = router;
