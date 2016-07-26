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

router.post('/logout', function(req, res, next){
  if(!req.isAuthenticated()){
    res.status(200).send({
      success: false,
      msg: 'Currently not Logged In!'
    });
  }
  else {
    req.logout();
    res.status(200).send({
      success: true,
      redirectTo: '/'
    });
  }
});




module.exports = router;
