const express = require('express');
const mongoose = require('mongoose');
const route = require('./src/routes.js');
const app = express();
const cors = require('cors')
require('dotenv').config();
app.use(express.json());
app.use(cors())
mongoose.set({ strictQuery: true });
mongoose
  .connect(process.env.MongoDB_URI, { useNewUrlParser: true })
  .then(() => console.log('mongodb running and connected'))
  .catch((err) => console.log(err));
app.use('/api', route);

route.all('/*', function (req, res) {
  res.status(404).send({ status: false, error: 'URL NOT FOUND!' });
});

app.listen(process.env.PORT, () => {
  console.log(`running on ${process.env.PORT}`);
});

module.exports = app;
