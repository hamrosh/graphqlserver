import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './schema/schema';
import AppUser from './models/AppUser';
// declaring the express app and the port to be used
const app = express();
const PORT = 5000;

// move this key to the config file later
const mongoURI = 'mongodb://sa:ham24MDB@ds259499.mlab.com:59499/itigurus';

// Cors used for request from CLient App  in Local Development

app.use(cors());

// mongobd Connection and Setup

mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('Connected to Database ');
});

//  Setting the Graphql Endpoints

app.get('/', (req, res) => res.sendFile('auth.html', { root: __dirname }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) =>
  res.send('Welcome ' + req.query.username + '!!')
);
app.get('/error', (req, res) => res.send('error logging in'));

passport.serializeUser(function(user, cb) {
  console.log(user);
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  console.log(id);
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    console.log(username);
    AppUser.findOne(
      {
        emailid: username
      },
      function(err, user) {
        console.log(user);
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        if (user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      }
    );
  })
);

app.post(
  '/',
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success?username=' + req.user.fullname);
  }
);

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => {
    return {
      schema: schema,
      context: {
        userid: null
      }
      // other options here
    };
  })
);
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Starting the server on Port , usee the ENV.PORT varialble Later

app.listen(PORT, () => {
  console.log('Listening on Port 5000');
});
