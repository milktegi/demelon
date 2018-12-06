const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
require('./routes/api/users')(app);
require('./routes/api/profile');
require('./routes/api/posts');

// DB config
const db = require('./config/keys').mongoURI;

// connects to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('mongodb connected!'))
  .catch(err => console.log(err));


app.get('/', (req, res) => {
  res.send({ hello: 'egi' });
});

// Use Routes 

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`server running on port ${port}`));
