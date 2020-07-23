const mongoose = require('mongoose');

const deathsSchema = mongoose.Schema({
  count:{type:Number},
    district:{type:Number},
   
});

module.exports = mongoose.model('Deaths', deathsSchema);