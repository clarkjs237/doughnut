// This is where I will connect to the database
// const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

// This also works for establishing a connection and exporting it correctly
const server = 'mongodb://localhost:27017';
const database = 'assets';

const connectDB = async () => {
  try {
    await mongoose.connect(`${server}/${database}`)
    console.log('Mongodb connected');
  } catch (err) {
    console.log('Failed to connect to mongodb')
  }
}

module.exports = connectDB();



// This right here works so far. I want to try and use async though.
// const url = 'mongodb://localhost:27017/assets';
// mongoose.connect(url);
// var db = mongoose.connection;

// db.on('error', () => {
//   console.log('mongoose connection error');
// })

// db.once('open', () => {
//   console.log('mongoose connected successfully');
// })

// module.exports = db;