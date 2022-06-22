// This is the models responsible for connecting to the DB and APIs
const mongoose = require('mongoose');
const db = require('../index.js');

const AssetSchema = mongoose.Schema({
  name: String, // Bitcoin, Apple Inc., etc
  class: String, // crypto, stocks, nfts, etc.
  currPrice: Number, // current price
  amount: Number, // amount currently held
  notes: String, // any notes about this item, PW, where stored etc
  ticker: String, // BTC, ETH, AAPL
  logo: String // this is a url to the image for it's logo
});

const Assets = mongoose.model('Assets', AssetSchema);

module.exports = Assets;