const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path    = require("path");

const users = require('./routes/api/users');
const cards = require('./routes/api/cards');
const posts = require('./routes/api/posts');


const app = express();


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);


// DB Config
const db = require('./config/keys').mongoURI;
// Connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Use Routes
app.use('/api/users', users);
app.use('/api/cards', cards);
app.use('/api/posts', posts);

// Server static assets if in production
if ( process.env.NODE_ENV === 'production' ) {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// app.get('/index', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));
// static file path so that you don’t need to resolve path in every routes
// app.use(express.static(__dirname+'/'));


// Run Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
