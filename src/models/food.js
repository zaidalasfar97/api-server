'use strict';
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingerd: { type: String },
});

const foodModel = mongoose.model('food', foodSchema);

module.exports = foodModel;