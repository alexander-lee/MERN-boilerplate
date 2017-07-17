export const USER = 'user';

const validators = {
  [USER]: (req) => {
    return Boolean(req.user);
  }
};

const redirects = {
  [USER]: '/login'
};

export default (level) => {
  return (req, res, next) => {
    const valid = validators[level](req);

    if(valid) {
      return next();
    }

    if(!req.path.startsWith('/api')) {
      res.redirect(redirects[level])
    }
    else {
      res.status(401).send({
        redirectTo: redirects[level],
        error: 'Unauthorized Access!'
      });
    }
  }
}
