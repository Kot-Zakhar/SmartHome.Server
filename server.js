import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import apiRouter from './api/router.js'
import databaseConfig from './config/database.js'


mongoose.connect(databaseConfig.database, { useNewUrlParser: true });
mongoose.connection
.on('connected', () => {
  console.log('Connected to database ' + databaseConfig.database)
})
.on('error', (err) => {
  console.log('Error connecting to mongo: ' + err);
})


let port = 9090;
let app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('dist'));

app.get('/api', apiRouter);

app.listen(port, () => console.log(`Http is started on ${port}`));
