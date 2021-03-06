var fs = require('fs');
var parse = require('csv-parse/lib/sync');
var path = require('path');
var interface = require('../modules/interface').interface;
const express = require('express');
const router = express.Router();

// Create the IElement Interface :)
let IElement = interface.implements({Position: '', Name: '', Weight: '', Symbol: ''});
//

let elements = new Array(IElement);

// DATABASE SETUP
var mongooseTableData   = require('mongoose');
mongooseTableData.connect('mongodb://localhost:27017/presentation'); // connect to our database
// Handle the connection event
var dbTableData = mongooseTableData.connection;
dbTableData.on('error', console.error.bind(console, 'connection error:'));

dbTableData.once('open', function() {
  console.log("DB connection alive");
});

// Element models lives here
var Element     = require('../../src/app/models/element');

// END DATABASE SETUP

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all elements
router.get('/elementsOLD', (req, res) => {
  // Get elements from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  console.log('in routes api route');
  axios.get(`${API}/elements`)
    .then(elements => {
      res.status(200).json(elements.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

// Get simple test
router.get('/tester', (req, res) => {
  // Get elements from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  let testElements = new Array(Element);
  console.log('in tester api route');
  testElements = getOneElement('./elements.csv');
  res.status(200).send(testElements);
});

// Get simple test #2
router.get('/tester2', (req, res) => {
  // Get elements from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  let testElements = new Array(Element);
  console.log('in tester2 api route');
  testElements = getOneElement('./otherData.csv');
  res.status(200).send(testElements);
});

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
