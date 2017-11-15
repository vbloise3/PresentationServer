var fs = require('fs');
var parse = require('csv-parse/lib/sync');
var path = require('path');
var interface = require('../modules/interface').interface;
const url = require('url');
const querystring = require('querystring');
// Interface = require('../modules/interfaceES6');
// var interface = new Interface();

const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

// Create the IPost Interface :)
let IPost = interface.implements({Title: '', Body: '', UserId: '', Id: ''});
//
// Create the IElement Interface :)
let IElement = interface.implements({Position: '', Name: '', Weight: '', Symbol: ''});
//

let posts = new Array(IPost);
let elements = new Array(IElement);

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
// Element models lives here
var Element     = require('../../src/app/models/element');

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

// Get html file for presentation slides
// add parameters to define which presentation directory and which slide with the directory
router.get('/getThePresentation', (req, res) => {
  // console.log('in get first presentation');
  // read the html file
  // will want to send in file name and directory within public as parameters eventually
  // var slideNumber = req.param('slide');
  let parsedUrl = url.parse(req.originalUrl);
  let parsedQs = querystring.parse(parsedUrl.query);
  // console.log('slide: ' + parsedQs.slide);
  // console.log('req.originalUrl: ' + req.originalUrl);
  fs.readFile('public/' + parsedQs.directory + '/' + parsedQs.directory + parsedQs.slide + '.html', 'utf8', function (err, data) {
    if (err) throw err;
    var resultArray = data;
    // console.log('returned html: ' + data);
    res.send(data);
  });
});
// end get html file for presentation slides

// Get simple test #2
router.get('/tester2', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  let testPosts = new Array(Post);
  console.log('in tester2 api route');
  testPosts = getOnePost('./otherData.csv');
  res.status(200).send(testPosts);
});

// Posts routes
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

// Elements routes
router.route('/elements')
// create a elements (accessed at POST http://localhost:8080/elements)
  .post(function(req, res) {

    var element = new Element();		// create a new instance of the Element model
    element.Position = req.body.position;  // set the elements title (comes from the request)
    element.Name = req.body.name;  // set the elements body (comes from the request)
    element.Weight = req.body.weight;  // set the elements userId (comes from the request)
    element.Symbol = req.body.symbol;  // set the elements id (comes from the request)

    element.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Element created!' });
    });


  })

  // get all the elements (accessed at GET http://localhost:8080/api/elements)
  .get(function(req, res) {
    console.log("in get all elements from database");
    Element.find(function(err, elements) {
      if (err)
        res.send(err);

      res.json(elements);
      console.log("found " + elements.length + " elements");
    });
  });

// on routes that end in /elements/:element_id
// ----------------------------------------------------
router.route('/elements/:element_id')

// get the elements with that id
  .get(function(req, res) {
    Element.findById(req.params.element_id, function(err, element) {
      if (err)
        res.send(err);
      res.json(element);
    });
  })

  // update the elements with this id
  .put(function(req, res) {
    Element.findById(req.params.element_id, function(err, element) {

      if (err)
        res.send(err);

      element.Position = req.body.position;
      element.Name = req.body.name;  // set the elements body (comes from the request)
      element.Weight = req.body.weight;  // set the elements userId (comes from the request)
      element.Symbol = req.body.symbol;

      element.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Element updated!' });
      });

    });
  })

  // delete the elements with this id
  .delete(function(req, res) {
    Element.remove({
      _id: req.params.element_id
    }, function(err, element) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });


function getOneElement(fileName) {
  let csv = fs.readFileSync(fileName, 'utf8');

  elements = parse(csv, {columns: true}).map(element => {
    return {
      position: element.Position,
      name: element.Name,
      weight: element.Weight,
      symbol: element.Symbol
    };
  });
  console.log(elements.length + ' elements loaded at ' + new Date());
  console.log('first elements: ' + elements[0].name + ' ' + elements[0].body);
  console.log('JSON.stringified elements: ' + JSON.stringify(elements));

  return JSON.stringify(elements);
}

module.exports = router;
