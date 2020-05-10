import { Consumer, Producer, KafkaClient } from 'kafka-node';

export default class KafkaConnection {
    private kafkaConsumer: Consumer;
    private kafkaProduser: Producer;
    constructor() {
        let kafkaClient = new KafkaClient({
            kafkaHost: process.env.KAFKA_HOST || "localhost:10092",
            clientId: process.env.KAFKA_CLIENT_ID || "smarthome_kafka_client"
        });

        this.kafkaConsumer = new Consumer(
            kafkaClient,
            [],
            {
                autoCommit: false,
                fetchMaxWaitMs: 500,
                groupId: process.env.KAFKA_GROUP_ID || "smarthome_server_group"
            }
        );

        this.kafkaProduser = new Producer(kafkaClient);
    }


}