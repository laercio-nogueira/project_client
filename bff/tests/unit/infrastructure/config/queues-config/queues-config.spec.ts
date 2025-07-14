import rabbitMQConfig from '@infrastructure/config/queues-config/queues-config'
import { Transport } from '@nestjs/microservices'

describe('rabbitMQConfig', () => {
  let originalEnv: NodeJS.ProcessEnv

  beforeEach(() => {
    originalEnv = { ...process.env }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('should return correct RMQ configuration', () => {
    process.env.RABBIT_MQ_URL = 'amqp://localhost:5672'
    process.env.RABBIT_MQ_QUEUE = 'user-queue'

    const config = rabbitMQConfig()

    expect(config).toEqual({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'user-queue',
        queueOptions: {
          durable: true,
        },
      },
    })
  })

  it('should handle different environment variables', () => {
    process.env.RABBIT_MQ_URL = 'amqp://rabbitmq.production.com:5672'
    process.env.RABBIT_MQ_QUEUE = 'production-queue'

    const config = rabbitMQConfig()

    expect(config.options.urls).toEqual(['amqp://rabbitmq.production.com:5672'])
    expect(config.options.queue).toBe('production-queue')
  })

  it('should handle missing environment variables', () => {
    delete process.env.RABBIT_MQ_URL
    delete process.env.RABBIT_MQ_QUEUE

    const config = rabbitMQConfig()

    expect(config.options.urls).toEqual([undefined])
    expect(config.options.queue).toBeUndefined()
  })

  it('should always return RMQ transport', () => {
    const config = rabbitMQConfig()
    expect(config.transport).toBe(Transport.RMQ)
  })

  it('should always have durable queue options', () => {
    const config = rabbitMQConfig()
    expect(config.options.queueOptions).toEqual({
      durable: true,
    })
  })

  it('should handle multiple URLs in array', () => {
    process.env.RABBIT_MQ_URL = 'amqp://server1:5672,amqp://server2:5672'
    process.env.RABBIT_MQ_QUEUE = 'test-queue'

    const config = rabbitMQConfig()

    expect(config.options.urls).toEqual([
      'amqp://server1:5672,amqp://server2:5672',
    ])
    expect(config.options.queue).toBe('test-queue')
  })

  it('should maintain consistent structure regardless of env vars', () => {
    const config = rabbitMQConfig()

    expect(config).toHaveProperty('transport')
    expect(config).toHaveProperty('options')
    expect(config.options).toHaveProperty('urls')
    expect(config.options).toHaveProperty('queue')
    expect(config.options).toHaveProperty('queueOptions')
    expect(config.options.queueOptions).toHaveProperty('durable')
  })
})
