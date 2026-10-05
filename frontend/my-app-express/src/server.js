const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = 5000;;

app.use(bodyParser.json());
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// Serve static files from the React app's public folder
app.use(express.static(path.join(__dirname, '../app/public')));

const imagesPath = path.join(__dirname, '../app/public/images');
// Ensure the images folder exists
if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath, { recursive: true });
}
// Configure Multer to save to the React public/images folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagesPath); // Absolute path to save images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
// Create multer instance with storage configuration
const upload = multer({ storage: storage });

app.get('/users.json', cors({
  origin: 'http://localhost:3000',
  credentials: true
}), (req, res) => {
  const usersPath = path.resolve(__dirname, '../app/public', 'users.json');
  res.sendFile(usersPath);
});

app.get('/posts.json', cors({
  origin: 'http://localhost:3000',
  credentials: true
}), (req, res) => {
  const postsPath = path.resolve(__dirname, '../app/public', 'posts.json');
  res.sendFile(postsPath);
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/add-comment', cors({
  origin: 'http://localhost:3000',
  credentials: true
}), (req, res) => {
  const { postId, comment, username, profile } = req.body;  //The request from commentData in Post.js. We decalere the object so the server can read the data sent from the client

  if (!postId || !comment || !username || !profile) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

const postsPath = path.resolve(__dirname, '../app/public', 'posts.json'); //use path.resolve to get the absolute path to posts.json

fs.readFile(postsPath,'utf8', (err, data) => {
  if (err) {
    console.error('Error reading posts.json:', err);
    return res.status(500).send({ message: 'Error reading posts.json file' });
  }

    const posts = JSON.parse(data); //Parse the JSON data to get the posts array
    const post = posts.find(p=> p.id === postId); //Find the post with the matching postId
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }

    const newComment = {
      id: String(post.comments.length + 1),  // Comment ID based on the current comments length
      user: { username, profile },  
      comment,
      created: 'just now'  
    }

    post.comments.push(newComment); //Add the new comment to the post's comments array

    fs.writeFile(postsPath, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        return res.status(500).send({ message: 'Error writing to posts.json file' });
      } //Write the updated posts array back to posts.json

      res.send({ message: 'Comment added successfully' }); //Send success response to client
    });
  });
});

app.get('/user-posts/:username', cors({
  origin: 'http://localhost:3000',
  credentials: true
}), (req, res) => {
  const { username } = req.params;
  const postsPath = path.resolve(__dirname, '../app/public', 'posts.json');

  fs.readFile(postsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading posts.json:', err);
      return res.status(500).json({ message: 'Server error while reading posts' });
    }

  const posts = JSON.parse(data);
    const userPosts = posts.filter(post => post.user.username === username);
    res.json({ posts: userPosts });
  });
});

app.post('/add-post', cors({
  origin: 'http://localhost:3000',
  credentials: true
}), upload.single('image'), (req, res) => {
    const { description, username, profile } = req.body;
 
    // Validate required fields
    if (!req.file || !username || !description || !profile) {
      return res.status(400).json({ message: 'Missing required fields or image.' });
    }
   // Create variable to store the path to the posts.json file.
    const postsPath = path.resolve(__dirname, '../app/public', 'posts.json');
   // Read in posts.json 
    fs.readFile(postsPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading posts.json:', err);
        return res.status(500).json({ message: 'Error reading posts.json' });
      }
    let posts = [];
      try {
        posts = JSON.parse(data);
      } catch (parseErr) {
        console.error('Error parsing posts.json:', parseErr);
      }
      const newPost = {
        id: (posts.length + 1).toString(),
        user: {
          username,
          profile
        },
        comments: [],
        likes: 0,
        image: `/images/${req.file.filename}`,
        description,
        created: 'just now'
      };
      
    posts.push(newPost);
      
      fs.writeFile(postsPath, JSON.stringify(posts, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Error writing to posts.json:', writeErr);
          return res.status(500).json({ message: 'Error saving post' });
        }
 
        return res.status(200).json({ message: 'Post added successfully', post: newPost });
      });
    });
  });

  app.post('/signup', cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Type']
  }), upload.single('profileImage'), (req, res) => {
    const { username, password, bio } = req.body;
 
    if (!username || !password || !req.file) {
      return res.status(400).json({ message: 'Missing required fields or image.' });
    }
 
    const usersPath = path.resolve(__dirname, '../app/public', 'users.json');
 
    fs.readFile(usersPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading users.json:', err);
        return res.status(500).json({ message: 'Error reading users.json' });
      }
    let users = [];
      try {
        users = JSON.parse(data);
      } catch (parseErr) {
        console.error('Error parsing users.json:', parseErr);
      }
      //Check for existing user. Don't want username to be the same as another user
      if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  //new user object that matches the users.json format
      const newUser = {
        username,
        password,
        profile: `/images/${req.file.filename}`,
        bio
      };
      users.push(newUser);
 
      fs.writeFile(usersPath, JSON.stringify(users, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Error writing to users.json:', writeErr);
          return res.status(500).json({ message: 'Error saving user' });
        }
 
        return res.status(200).json({ message: 'Signup successful', user: newUser });
      });
    });
  });


