const express = require('express');
const uuid = require('uuid');
const app = express();

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = {};


// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    const user = users[req.body.email];
    console.log("Anotther fdsfsdfs")
    if (user) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const newUser = { firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email, 
        password: req.body.password, 
        token: uuid.v4() 
      };
      if (newUser.email in users) {
        res.status(409).send({ msg: 'Existing user' });
        return
      }
      users[newUser.email] = newUser;
      console.log("fdsfsdfsfds")
      console.log(users)
      res.send({ token: newUser.token });
      console.log('User created')
    }
  });
  
// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});
  
// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

apiRouter.get('/users', (_req, res) => {
  console.log(users)
  console.log("In users");
  res.send(users);
});


// Get a user by email
apiRouter.get('/users/:email', (req, res) => {
  const user = users[req.params.email];
  if (user) {
    res.send(user);
    console.log(`Logging in ${user}`)
  } else {
    res.status(404).send({ msg: 'User not found' });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


apiRouter.get('/status', (req, res) => {
  res.send({ msg: 'API is working!' });
});
  