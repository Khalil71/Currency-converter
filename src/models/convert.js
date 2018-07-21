const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const convertionSchema = new mongoose.Schema({
  fromCurrency: {
    type: String,
    required: true
  },
  toCurrency: {
    type: String,
    required: true
  },
  amountBefore: {
    type: Number,
    required: true
  },
  amountAfter: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true
  }
});

module.exports = mongoose.model('Convertion', convertionSchema);
