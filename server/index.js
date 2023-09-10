const keys = require('./keys');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

// pgClient.on('error', () => console.log('Lost PG connection'));

// pgClient
//   .query('CREATE TABLE IF NOT EXISTS values (number INT)')
//   .catch((err) => console.log(err));

pgClient.on('connect', (client) => {
  client
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch((err) => console.error(err));
});

const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});

const redisPublisher = redisClient.duplicate();

app.get('/', (req, res) => {
  res.send('hallo world');
});

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * from values');

  res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    res.send(values);
    console.log('values from server:', values);
  });
});

app.post('/values', async (req, res) => {
  const i = req.body.i;

  if (parseInt(i) > 40) {
    return res.status(422).send('Index too high');
  }

  if (parseInt(i) === '') {
    return res.status(204).send('Index is empty');
  }

  redisClient.hset('values', i, 'Nothing yet');
  redisPublisher.publish('insert', i);
  const query = pgClient.query('INSERT INTO values(number) VALUES($1)', [i]);
  console.log('server query', query);

  res.send({ working: true, i });
});

app.listen(5000, (err) => {
  console.log('Server connected with port 5000');
});
