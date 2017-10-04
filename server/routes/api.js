var fs = require('fs');
var parse = require('csv-parse/lib/sync');
var path = require('path');
const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

// Create the Post Interface :)
let Post = implement({Title: '', Body: '', UserId: '', Id: ''});
//

let posts = new Array(Post);

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
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
  testPosts = getOnePost();
  res.status(200).send(testPosts);
});

function getOnePost() {
  let csv = fs.readFileSync('./posts.csv', 'utf8');

  posts = parse(csv, {columns: true}).map(post => {
    return {
      Title: post.Title,
      Body: post.Body,
      UserId: post.UserId,
      Id: post.Id
    };
  });
  console.log(posts.length + ' posts loaded at ' + new Date());
  console.log('first post: ' + posts[0].Title + ' ' + posts[0].Body);
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
