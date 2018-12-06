const passport = require('passport');

// const router = express.Router();
// // @route GET api/posts/test
// // @desc  tests post route
// // @access public

// router.get('/test', (req, res) => res.json({ msg: 'Users works!' }));

// module.exports = router;

module.exports = app => {
  app.get('/test', (req, res) => res.json({ msg: 'Users works!' }));
};
