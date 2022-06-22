// This is the models responsible for connecting to the DB and APIs
const mongoose = require('mongoose');
const db = require('../index.js');

const AssetSchema = mongoose.Schema({
  name: String, // Bitcoin, Apple Inc., etc
  class: String, // crypto, stocks, nfts, etc.
  currPrice: {type: Number, default: null}, // current price
  amount: {type: Number, default: null}, // amount currently held
  notes: {type: String, default: ""}, // any notes about this item, PW, where stored etc
  ticker: {type: String, default: ""}, // BTC, ETH, AAPL
  logo: {type: String, default: "default url"}, // this is a url to the image for it's logo
  historical: {type: Array, default: []} // this will hold all of the historical data
});

const Assets = mongoose.model('Assets', AssetSchema);

module.exports = Assets;