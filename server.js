const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const passport = require('passport');
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connects to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('mongodb connected!'))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

// Use Routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/users/posts', posts);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`server running on port ${port}`));
