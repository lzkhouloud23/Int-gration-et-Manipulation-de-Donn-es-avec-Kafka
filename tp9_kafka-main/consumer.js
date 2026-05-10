require('dotenv').config();
const { Kafka } = require('kafkajs');
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'tp9kafka',
});

const kafka = new Kafka({
  clientId: 'tp9-consumer',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'test-group-2' });
const topic = process.env.KAFKA_TOPIC || 'test-topic';

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: false });
  console.log('Consommateur connecte sur : ' + topic);

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const rawValue = message.value?.toString();
      const key = message.key?.toString() || null;
      const offset = message.offset;

      let payload = null;
      try {
        payload = JSON.parse(rawValue);
      } catch (e) {
        payload = { raw: rawValue };
      }

      console.log('Message recu :', { topic, partition, offset, key });

      try {
        const result = await pool.query(
          'INSERT INTO kafka_messages (topic, partition, "offset", key, payload) VALUES ($1, $2, $3, $4, $5) RETURNING id',
          [topic, partition, parseInt(offset), key, payload]
        );
        console.log('Sauvegarde en base, id=' + result.rows[0].id);
      } catch (err) {
        console.error('Erreur insertion :', err.message);
      }
    },
  });
};

run().catch(console.error);