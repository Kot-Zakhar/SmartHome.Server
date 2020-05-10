import WebSocket, { Server as WebSocketServer } from 'ws';
import { KafkaWebSocket } from './KafkaWebSocket';
import debug from 'debug';
import { IncomingMessage } from 'http';
import { Consumer, Producer, KafkaClient } from 'kafka-node';
import KafkaConnection from './KafkaConnection';

export default class SocketServer {
    private server: WebSocketServer;
    private log = debug('app:SocketServer');

    private clients: KafkaWebSocket[] = [];

    private kafkaConnection: KafkaConnection;


    constructor(port: number) {

        this.server = new WebSocketServer({
            port: port
        });
        let log = this.log;
        this.server.on('listening', this.log.bind(null, "Socket server is started on %d port", port));
        this.server.on('error', this.log);

        this.kafkaConnection = new KafkaConnection();

        let clients = this.clients;
        let kafkaConnection = this.kafkaConnection;
        this.server.on('connection', this.onWebSocketConnection.bind(this));
    }

    private onWebSocketConnection(ws: WebSocket) {
        this.clients.push(new KafkaWebSocket(ws, this.kafkaConnection));
        this.log("New connection");
    }
}