const express = require('express');
const uuid = require('uuid');
const { getUser, updateUserBio, createUser, connectToDatabase, updateUserToken } = require('./database');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// Connect to the database when the app starts
connectToDatabase().then(() => {
  console.log('Database connected!');
}).catch(console.error);

apiRouter.post('/api/auth/add-folder', async (req, res) => {
  const { email, folderName } = req.body;

  try {
    // Get the user by email
    const user = await getUser(email);
    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }

    // Check if folder already exists
    if (user.folders.includes(folderName)) {
      return res.status(409).send({ msg: 'Folder already exists' });
    }

    // Add the new folder to the user's folder array
    user.folders.push(folderName);
    await updateUserBio(email, user); // Or update the user with the new folders

    res.send({ msg: 'Folder created successfully', folders: user.folders });
  } catch (error) {
    console.error('Error adding folder:', error);
    res.status(500).send({ msg: 'Failed to create folder' });
  }
});


// app.get('/api/folders', (req, res) => {
//   const folders = ["Nature", "Family", "Sonnets"];
//   res.json({ folders });
// });

app.post('/api/poems', (req, res) => {
  const { title, poem, folder } = req.body;

  if (!title || !poem || !folder) {
      return res.status(400).send("All fields are required.");
  }

  // Save poem logic here
  console.log(`Poem "${title}" saved to folder "${folder}"`);
  res.status(200).send("Poem saved successfully.");
});

apiRouter.post('/users/:email/folders', async (req, res) => {
  const email = req.params.email;
  const { folderName } = req.body;

  try {
    const user = await getUser(email);
    if (!user) {
      res.status(404).send({ msg: 'User not found' });
      return;
    }

    await updateUserFolder(email, folder);
    res.send({ msg: 'Folder added successfully!', folder });
  } catch (error) {
    console.error('Error updating folder:', error);
    res.status(500).send({ msg: 'Failed to update folder' });
  }
});

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
    folders: [],
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
  console.log('updateUserToken:', updateUserToken);

  try {
    const user = await getUser(email);
    console.log("user", user);
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
  