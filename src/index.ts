import path from 'path';
import { Server } from './server';
import dotenv from 'dotenv';

const result = dotenv.config();

const port = process.env.PORT || 80;
const staticFolder = process.env.PUBLIC || path.resolve('public');

const app = new Server();

app.useCors();
app.useMorgan('tiny');
app.enableLogs('*');

app.mountApi('/api');
app.useStaticFolder(staticFolder);
app.listen(port, () => console.log(`Http is started on ${port}. Static files are hosted from ${staticFolder}`));

