const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

/// moodel
const Post = require('../../models/Post');

// validation
const validatePostInput = require('../../validation/post');

router.get('/test', (req, res) => {
  res.json({ message: 'post works!' });
});

//@route  Post api/posts/test
//@desc   Create post
//@access Private

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if(!isValid) {
      //errors 
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.name,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
