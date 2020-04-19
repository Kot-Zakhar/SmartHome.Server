import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import api from './api';

// debug and logs
import debug from 'debug';
import morgan from 'morgan';
debug.enable('*');
const log = debug("server");
log("Logging is enabled.");



const app = express();

// middleware
app.use(cors());
app.use(morgan('tiny'));

// routes
app.use('/api', api);

const port = process.env.PORT || 80;
const staticFolder = process.env.PUBLIC || path.resolve('public');

app.use(express.static(staticFolder));

const server = app.listen(port, () => log(`Http is started on ${port}. Static files are hosted from ${staticFolder}`));

log(server.address());
