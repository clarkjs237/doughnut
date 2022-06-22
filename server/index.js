const express = require('express');
const path = require('path');
require("dotenv").config({
  path: path.join(__dirname,'..','.env.file'),
});

const { getAll, addToDb } = require('./db/controllers/assets.js');

const port = 3001;

const app = express();
app.use(express.json());

app.get('/test', (req, res) => {
  // console.log(process.env.FINN_API)
  getAll()
  .then((results) => res.send(results))
  .catch((err) => console.log(err))

  // res.send({data: "hello!"})
})

app.post('/poster', (req, res) => {
  // this will add this to the db based on the schema design
  addToDb(req.body)
  .then((result) => res.send(result))
  .catch((err) => console.log(err))
  // res.send('hehe')
})

app.listen(port, () => {
  console.log(`Server running on ${port}`);
})