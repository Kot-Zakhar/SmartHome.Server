import express from 'express';
import path from 'path';
import cors from 'cors';

// import api from './api/api'

import debug from 'debug';
import morgan from 'morgan';

debug.enable('*');
const log = debug("server");
log("Logging is enabled.");

const app = express();

app.use(cors());
app.use(morgan('tiny'));

// app.use('/api', api);
app.all('/api', (req, res) => {
    res.send("Ok");
})

const port = process.env.PORT || 9090;
const staticFolder = process.env.PUBLIC || path.resolve('public');

app.use(express.static(staticFolder));

app.listen(port, () => log(`Http is started on ${port}. Static files are hosted from ${staticFolder}`));
