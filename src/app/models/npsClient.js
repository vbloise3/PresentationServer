var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NpsclientSchema = new Schema({
  Name: String,
  Department: String,
  Schedule: String,
  RelationshipOwner: String
});

module.exports = mongoose.model('Npsclient', NpsclientSchema);
