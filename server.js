const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

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

app.get('/', (req, res) => {
  res.send({ hello: 'egi' });
});

// Use Routes

app.use('/api/users', users);
app.use('/api/users', profile);
app.use('/api/users', posts);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`server running on port ${port}`));
