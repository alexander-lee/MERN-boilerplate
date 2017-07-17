import express from 'express';
import { User } from '../models';

const router = express.Router();

router.get('/api/user', async function(req, res) {
  let user = null;

  if(req.isAuthenticated() && req.session.hasOwnProperty('passport')) {
    const userId = req.session.passport.user;
    user = await User.findById(userId);
  }

  res.status(200).send({
    user: user
  });
});

export default router;
