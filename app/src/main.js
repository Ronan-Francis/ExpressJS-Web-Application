const express = require('express');
const mysql = require('mysql2');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 4000;

// MySQL connection
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'proj2023'
});

// MongoDB connection
const mongoUrl = 'your_mongodb_connection_url';
const mongoClient = new MongoClient(mongoUrl);

app.get('/managers', async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db('proj2023MongoDB');
    const managers = database.collection('managers');
    const managerData = await managers.find().toArray();
    res.json(managerData);
  } catch (err) {
    res.status(500).send('Error retrieving managers data');
  } finally {
    await mongoClient.close();
  }
});

app.get('/products', (req, res) => {
  mysqlConnection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving products data');
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
