const Assets = require('../models/assets.js');
const path = require('path');
require("dotenv").config({
  path: path.join(__dirname,'..','.env.file'),
});

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


// ----------------------------------------------------------------------
//                        ESTABLISH CONNECTIONS TO APIs
// ----------------------------------------------------------------------

// 1. CoinGecko Crypto - current and historical data
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

// 2. Finnhub - current stock data
// process.env.FINN_API

// 3. EOD API - historical stock data
// Only run this sparingly


// ----------------------------------------------------------------------
//                            CRUD FUNCTIONS
// ----------------------------------------------------------------------

//                            READ ALL
// ----------------------------------------------------------------------
// Gets all of the entries from the database whose values aren't 0
exports.getAll = async () => {
  const data = await Assets.find({ amount : { $ne: 0}});
  return data;
}



//                          CREATE and UPDATE
// ----------------------------------------------------------------------
// Helper function to get the current price
async function currentCrpytoPrice(asset) {
  const data = await CoinGeckoClient.simple.price({
    ids: [asset],
    vs_currencies: ['usd']
  })

  return data;
}

// Get the historical data from CoinGecko
async function cryptoHist(asset) {
  const data = await CoinGeckoClient.coins.fetchMarketChart(asset, {
    days: 7
  })

  return data.data.prices;
}

// Helper function for historical data. DO NOT RUN BESIDES LOADING DB BC I WILL GET CHARGED
async function historicalStock(asset) {
  const symbol = asset;
  console.log(symbol);
  let data = await fetch(`https://eodhistoricaldata.com/api/eod/${symbol}.US?api_token=${process.env.EOD_API}&period=d&fmt=json&order=d&from=2020-12-31&to=2022-06-22`)
  data = data.json();
  return data;
}

async function currentStock(asset) {
  const symbol = asset;
  let data = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINN_API}`);
  data = data.json();
  return data;
}

exports.addToDb = async (input) => {

  if (input.class === 'crypto') {
    // I want to get the current price of this asset from coingecko
    const crpyto_data = await currentCrpytoPrice(input.name);
    const price = crpyto_data.data[input.name].usd;

    // Update the input price to be this
    input.currPrice = price;

    // Also want an if statement here to get the historical data
    // If input.historical === undefined, get the data and put it in here
    // result.data.prices is an array that we will want to store
    const crypto_hist = await cryptoHist(input.name);
    // Set historical to equal this array of arrays
    input.historical = crypto_hist;
  } else {
    // This is where the stock market information will go
    // In here, I'm not going to do any calls. I will preload the
    // DB with the historical data so I don't need to worry about it
    // const historical_stock = await historicalStock(input.ticker);
    // input.historical = historical_stock;

    const curr_stock_price = await currentStock(input.ticker);
    input.currPrice = curr_stock_price.c;
  }

  // This updates the input based on the name of the asset, like 'bitcoin' or 'ethereum'
  // If it doesn't exist, it creates a new entry for this asset
  const data = await Assets.findOneAndUpdate({name: input.name}, {...input}, {new: true, upsert: true});

  // Returns the updated input object. Might be unneccesary
  return data;
}



//            DELETE (not really delete, just set amount to 0 and filter out)
// ----------------------------------------------------------------------

// Don't actually delete from db, just set the amount to zero and filter out in frontend
exports.deleteFromDb = async (input) => {
  const data = await Assets.findOneAndUpdate({name: input}, {amount: 0}, {new: true});
  return data;
}



// Instead of deleting from the db, let's just update the amount to be zero and filter
// that out on the front end. This way I can still keep my urls and such
// exports.deleteFromDb = async (input) => {
//   // input will be the name of the thing we want to delete
//   const data = await Assets.findOneAndDelete({name: input});

//   return data;
// }
