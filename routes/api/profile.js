const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load profile model
const Profile = require('../../models/Profile');
// load user profile model
const User = require('../../models/User');

// @route 	GET api/profile/test
// @desc 	Tests profile route
// @access 	Public

router.get('/test', (req, res) => {
  res.json({ message: 'profile works!' });
});

// @route 	GET api/profile
// @desc 	Get current user profile
// @access 	Private

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = '프로필이 존재하지 않습니다';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
