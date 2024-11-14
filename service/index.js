const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// app.get('*', (_req, res) => {
//   res.send({ msg: 'Simon service' });
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log('Server started')
});

const uuid = require('uuid');
app.use(express.json());

let users = {};

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    const user = users[req.body.email];
    if (user) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
      users[user.email] = user;
  
      res.send({ token: user.token });
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

  // Get a list of all users
apiRouter.get('/users', (req, res) => {
    res.send(Object.values(users));
  });
  
  // Get a user by email
  apiRouter.get('/users/:email', (req, res) => {
    const user = users[req.params.email];
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ msg: 'User not found' });
    }
  });
  