var Promise = require('bluebird');
var passport = require('passport');

/*
  - Main Function that uses below functions to authenticate the user
  - Returns a response that tells the Frontend where to redirectTo via browserHistory
*/
module.exports = function(req, res, next){
  Promise.resolve(authenticate('local', req, res, next))
  .then(function(user){
    return login(user, req, res, next);
  })
  .then(function(response){
    res.status(200).send({
      success: true,
      redirectTo: response.redirectTo
    })
  })
  .catch(function(err){
    res.status(200).send({
      success: false,
      err: err
    })
  })
}

/* 
  - Authenticates via Passport at specified strategy by @param type
  - Returns a Promise that if resolved, returns the user
*/
var authenticate = function(type, req, res, next){
  return new Promise(function(resolve, reject){
    passport.authenticate(type, function(err, user, info){
      if(err)
        reject(err.message);
      else if(!user)
        reject(info.message);
      else 
        resolve(user);
    })(req, res, next);
  });
}

/*
  - Attempts to Login given the @param user
  - Returns a Promise that will be used for the HTTP Response
*/
var login = function(user, req, res, next){
  return new Promise(function(resolve, reject){
    req.logIn(user, function(err){
      if(!err)
        resolve({redirectTo: '/test'});
      else 
        reject(err.message);
    });
  });
}
