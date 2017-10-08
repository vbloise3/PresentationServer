var fs = require('fs');
var parse = require('csv-parse/lib/sync');
var path = require('path');
const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

// Create the IPost Interface :)
let IPost = implement({Title: '', Body: '', UserId: '', Id: ''});
//

let posts = new Array(IPost);

// DATABASE SETUP
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/presentation'); // connect to our database
// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

// Post models lives here
var Post     = require('../../src/app/models/post');

// END DATABASE SETUP

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/postsOLD', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  console.log('in routes api route');
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

// Get simple test
router.get('/tester', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  let testPosts = new Array(Post);
  console.log('in tester api route');
  testPosts = getOnePost('./posts.csv');
  res.status(200).send(testPosts);
});

// Get simple test #2
router.get('/tester2', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  let testPosts = new Array(Post);
  console.log('in tester2 api route');
  testPosts = getOnePost('./otherData.csv');
  res.status(200).send(testPosts);
});

router.route('/posts')
// create a post (accessed at POST http://localhost:8080/posts)
  .post(function(req, res) {

    var post = new Post();		// create a new instance of the Post model
    post.Title = req.body.title;  // set the posts title (comes from the request)
    post.Body = req.body.body;  // set the posts body (comes from the request)
    post.UserId = req.body.userId;  // set the posts userId (comes from the request)
    post.Id = req.body.id;  // set the posts id (comes from the request)

    post.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Post created!' });
    });


  })

  // get all the posts (accessed at GET http://localhost:8080/api/posts)
  .get(function(req, res) {
    console.log("in get all posts from database");
    Post.find(function(err, posts) {
      if (err)
        res.send(err);

      res.json(posts);
      console.log("found " + posts.length + " posts");
    });
  });

// on routes that end in /posts/:post_id
// ----------------------------------------------------
router.route('/posts/:post_id')

// get the post with that id
  .get(function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
      if (err)
        res.send(err);
      res.json(post);
    });
  })

  // update the post with this id
  .put(function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {

      if (err)
        res.send(err);

      post.Title = req.body.title;
      post.Body = req.body.body;  // set the posts body (comes from the request)
      post.UserId = req.body.userId;  // set the posts userId (comes from the request)
      post.Id = req.body.id;

      post.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Post updated!' });
      });

    });
  })

  // delete the post with this id
  .delete(function(req, res) {
    Post.remove({
      _id: req.params.post_id
    }, function(err, post) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });


function getOnePost(fileName) {
  let csv = fs.readFileSync(fileName, 'utf8');

  posts = parse(csv, {columns: true}).map(post => {
    return {
      title: post.Title,
      body: post.Body,
      userId: post.UserId,
      id: post.Id
    };
  });
  console.log(posts.length + ' posts loaded at ' + new Date());
  console.log('first post: ' + posts[0].title + ' ' + posts[0].body);
  console.log('JSON.stringified posts: ' + JSON.stringify(posts));

  return JSON.stringify(posts);
}

module.exports = router;





function implement(target, ...interfaces) {
  const
    // interfaces are uinique and stored as such
    set = new Set(),
    // every interface will augment the new proto
    defineProperties = (proto, iface) => {
      if (!set.has(iface)) {
        set.add(iface);
        Object.defineProperties(
          proto,
          Object.getOwnPropertyDescriptors(iface)
        );
      }
      return proto;
    }
  ;
  // insert between the target and its __proto__ ...
  return Object.setPrototypeOf(
    target,
    // ... a "man-in-the-middle" like object ...
    interfaces.reduce(
      (proto, iface) => {
        // ... configured through all descriptors
        // retrieved from each interface and also
        // from their possibly implemented interfaces too ...
        if (implement.symbol in iface)
          Array.from(iface[implement.symbol])
            .forEach(iface => defineProperties(proto, iface));
        return defineProperties(proto, iface);
      },
      // ... without losing original inheritance ...
      Object.create(
        Object.getPrototypeOf(target),
        {
          [implement.symbol]: {
            configurable: true,
            // ... making analysis at runtime straight forward
            value: set
          }
        }
      )
    )
  );
}
