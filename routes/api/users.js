var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();

var User = require('../../server/model').User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res){
  var user = req.body;
  console.log(req.body);
  User.forge({username: user.username}).fetch()
  .then(function(model){
    console.log(model);
    if(model)
      throw 'Username taken';
    
    var password = user.password;
    var hashed_pass = bcrypt.hashSync(password, 8);

    var newUser = User.forge({username: user.username, password: hashed_pass});
    return newUser.save()
  })
  .then(function(model){
    res.status(200).send({
      success: true,
      data: model
    })
  })
  .catch(function(err){
    console.log('user post err:', err);
    res.status(200).send({
      success: false,
      msg: err.toString()
    })
  })
});

module.exports = router;
