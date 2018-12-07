const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load profile validation
const validateProfileInput = require('../../validation/profile');

// load profile model
const Profile = require('../../models/Profile');
// load user profile model
const User = require('../../models/User');

// @route 	GET api/profile
// @desc 	Get current user profile
// @access 	Private

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = '해당 유저의 프로파일이 존재하지 않습니다';
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// backend

// @route 	GET api/profile/handle/:handle
// @desc 	  get profile by handle
// @access 	Public - no passport auth

router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = '해당 유저의 프로파일이 존재하지 않습니다.';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// backend

// @route 	GET api/profile/iser/:user_id
// @desc 	  profile by handle
// @access 	Public - no passport auth

router.get('/user/:user_id', (req, res) => {
  Profile.findOne({ handle: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = '해당 유저의 프로파일이 존재하지 않습니다.';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res
        .status(404)
        .json({ profile: '해당 유저의 프로필은 존재하지 않습니다.' })
    );
});

// @route 	GET api/profile/all
// @desc 	  get all profiles
// @access 	Public - no passport auth

router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
    .populate()
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = '해당 유저의 프로필은 존재하지 않습니다.';
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => {
      res
        .status(404)
        .json({ profile: '해당 유저의 프로필은 존재하지 않습니다.' });
    });
});

// @route 	POST api/profile
// @desc 	Get current user profile
// @access 	Private

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      // return errors
      return res.status(400).json(errors);
    }
    // get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    // skills - split into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(err => {
            res
              .status(404)
              .json({ profile: '해당 유저의 프로필은 존재하지 않습니다.' });
          });
      } else {
        // create

        // check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = '이미 존재하는 프로필입니다';
            res.status(400).json(errors);
          }

          // save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
