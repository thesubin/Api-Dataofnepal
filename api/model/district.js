const mongoose = require('mongoose');

const districtSchema = mongoose.Schema({
 cases: { type: [], ref: 'Cases', required: true },
 recovered: { type: [], ref: 'Recovered', required: true },
 deaths: { type: [], ref: 'Deaths', required: true },   

});

module.exports = mongoose.model('District', districtSchema);