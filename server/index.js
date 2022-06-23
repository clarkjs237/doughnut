const express = require('express');
const path = require('path');
require("dotenv").config({
  path: path.join(__dirname,'..','.env.file'),
});

const { getAll, addToDb, deleteFromDb } = require('./db/controllers/assets.js');

const port = 3001;

const app = express();
app.use(express.json());

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


app.get('/assets', (req, res) => {
  getAll()
  .then((results) => res.send(results))
  .catch((err) => console.log(err))
})

app.post('/assets', (req, res) => {
  // this will add this to the db based on the schema design
  addToDb(req.body)
  .then((result) => res.send(result))
  .catch((err) => console.log(err))
})

app.delete('/assets', (req, res) => {
  deleteFromDb(req.body.name)
  .then((result) => res.send(result))
  .catch((err) => console.log(err))
})

app.get('/assets/refresh', (req, res) => {
  // this is where I want to refresh the current prices for each one of the assets in the db
  refreshCurrentPrices()
  .then((result) => res.send(result))
  .catch((err) => console.log(err))
})


app.listen(port, () => {
  console.log(`Server running on ${port}`);
})