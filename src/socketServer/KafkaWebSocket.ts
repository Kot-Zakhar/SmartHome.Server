import WebSocket from 'ws';
import KafkaConnection from './KafkaConnection';
import debug from 'debug';
import { v4 as uuidv4 } from 'uuid';

export class KafkaWebSocket {
    private readonly log: debug.Debugger;
    private readonly id: string;
    constructor(
        public readonly ws: WebSocket,
        private kafkaConnection: KafkaConnection
    ) {
        this.id = uuidv4();
        this.log = debug("app:KafkaWebSocket-" + this.id);

        this.bindToSocket();
    }

    private bindToSocket() {
        // this.ws.on()
    }

    public 
}