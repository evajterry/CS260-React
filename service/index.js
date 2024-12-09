const express = require('express');
const uuid = require('uuid');
const { getUser, updateUserBio, createUser, connectToDatabase, updateUserToken, updateUserPoems } = require('./database');
const app = express();
const { peerProxy } = require('./peerProxy.js');

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// Connect to the database when the app starts
connectToDatabase().then(() => {
  console.log('Database connected!');
}).catch(console.error);

// Save or update a user's bio
apiRouter.post('/users/:email/bio', async (req, res) => {
  const email = req.params.email;
  const { bio } = req.body;

  try {
    const user = await getUser(email);
    if (!user) {
      res.status(404).send({ msg: 'User not found' });
      return;
    }

    await updateUserBio(email, bio);
    res.send({ msg: 'Bio updated successfully!', bio });
  } catch (error) {
    console.error('Error updating bio:', error);
    res.status(500).send({ msg: 'Failed to update bio' });
  }
});

// Save a poem
apiRouter.post('/users/:email/poems', async (req, res) => {
  const email = req.params.email;
  const { poem } = req.body;

  try {
    const user = await getUser(email);
    if (!user) {
      res.status(404).send({ msg: 'User not found' });
      return;
    }

    await updateUserPoems(email, poem);
    res.send({ msg: 'Poem added successfully!', poem });
  } catch (error) {
    console.error('Error saving poem:', error);
    res.status(500).send({ msg: 'Failed to save poem' });
  }
});

// Get a user's poems
apiRouter.get('/users/:email/poems', async (req, res) => {
  const email = req.params.email;

  try {
    const user = await getUser(email);
    console.log("user: ", user);
    if (!user) {
      res.status(404).send({ msg: 'User not found' });
      return;
    }

    res.send({ email: user.email, poems: user.poems || '' }); // maybe this should be not poems but poem
  } catch (error) {
    console.error('Error fetching user poems:', error);
    res.status(500).send({ msg: 'Failed to fetch poems' });
  }
});

// Get a user's bio
apiRouter.get('/users/:email/bio', async (req, res) => {
  const email = req.params.email;

  try {
    const user = await getUser(email);
    if (!user) {
      res.status(404).send({ msg: 'User not found' });
      return;
    }

    res.send({ email: user.email, bio: user.bio || '' });
  } catch (error) {
    console.error('Error fetching user bio:', error);
    res.status(500).send({ msg: 'Failed to fetch bio' });
  }
});

// Create a new user
apiRouter.post('/auth/create', async (req, res) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password, // Ideally, hash this with bcrypt before saving
    token: uuid.v4(),
    bio: '',
    poems: [],
  };

  try {
    const existingUser = await getUser(newUser.email);
    if (existingUser) {
      res.status(409).send({ msg: 'Existing user' });
      return;
    }

    await createUser(newUser);
    res.send({ token: newUser.token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ msg: 'Failed to create user' });
  }
});
  
// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  // console.log('updateUserToken:', updateUserToken);

  try {
    const user = await getUser(email);
    // console.log("user", user);
    if (!user) {
      return res.status(401).send({ msg: 'User not found' });
    }

    if (password === user.password) {
      const token = uuid.v4();
      await updateUserToken(user.email, token); // Ensure this function exists and is imported correctly
      res.send({ token });
    } else {
      res.status(401).send({ msg: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ msg: 'Failed to log in' });
  }
});


apiRouter.get('/users', async (_req, res) => {
  try {
    const usersList = await userCollection.find().toArray();
    res.send(usersList);
  } catch (error) {
    res.status(500).send({ msg: 'Failed to fetch users' });
  }
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


apiRouter.get('/users/:email', async (req, res) => {
  const email = req.params.email;
  const user = await getUser(email); // This will fetch from MongoDB
  if (user) {
    res.send(user);
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
  
peerProxy(httpService);