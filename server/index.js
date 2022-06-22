const express = require('express');

const port = 3001;

const app = express();
// app.use(express.json());

app.get('/test', (req, res) => {
  res.send({data: "hello there!"})
})

app.listen(port, () => {
  console.log(`Server running on ${port}`);
})