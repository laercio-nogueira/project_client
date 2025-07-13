import { Transport, RmqOptions } from '@nestjs/microservices'

const rabbitMQConfig = (): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBIT_MQ_URL],
    queue: process.env.RABBIT_MQ_QUEUE,
    queueOptions: {
      durable: true,
    },
  },
})

export default rabbitMQConfig
