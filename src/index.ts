import path from 'path';
import HttpServer from './httpServer';
import dotenv from 'dotenv';
import SocketServer from './socketServer/socketServer';
import debug from 'debug';

debug.enable("*");
debug("app:Index")("Logging is enabled");

const result = dotenv.config();

const httpPort = Number.parseInt(process.env.HTTP_PORT || "80");
const staticFolder = process.env.PUBLIC || path.resolve('public');

const app = new HttpServer(httpPort, staticFolder);

const socketPort = Number.parseInt(process.env.SOCKET_PORT || "8080");
// const socketServer = new SocketServer(socketPort);
