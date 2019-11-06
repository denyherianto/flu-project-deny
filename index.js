require('dotenv').config();

const express = require('express');
const bodyParser= require('body-parser');
const mongoClient = require('mongodb').MongoClient
const app = express();
let db;
const dbCol = process.env.DB_COLLECTION;

app.use(bodyParser.json());

mongoClient.connect(process.env.DB_URI, (err, client) => {
  if (err) return console.log(err);
  db = client.db(process.env.DB_NAME);

  const router = require('./config/routes')(express, db, dbCol);
  app.use('/api', router); 
  app.listen(3003, function() {
    console.log('listening on 3003');
  });
});

