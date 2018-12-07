const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

/// moodel
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

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
    if (!isValid) {
      //errors
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

//@route  Get api/posts
//@desc   get post
//@access Private

router.get('/', (req, res) => {
  Post.find()
    .sort({ data: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ nopostfound: '게시물이 존재하지 않습니다' })
    );
});

//@route  Get api/posts/:id
//@desc   get postbyid
//@access Private

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: '게시물이 존재하지 않습니다' })
    );
});

//@route  Get api/delete
//@desc   delete post
//@access Private

router.delete('/:id', passport.authenticate('jwt',{ session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        // check for post owner
        if (post.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: '자신의 게시글만 삭제할 수 있습니다' });
        }
        // delete
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ postnofound: '해당 게시글을 찾을 수 없습니다.' })
      );
  });
});

module.exports = router;
