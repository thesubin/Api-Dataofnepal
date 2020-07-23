const mongoose = require('mongoose');

const recoveredSchema = mongoose.Schema({
  count:{type:Number},
    district:{type:Number},
   
});

module.exports = mongoose.model('Recovered', recoveredSchema);