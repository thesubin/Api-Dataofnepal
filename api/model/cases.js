const mongoose = require('mongoose');

const casesSchema = mongoose.Schema({
  count:{type:Number},
  district:{type:Number},
   
});

module.exports = mongoose.model('Cases', casesSchema);