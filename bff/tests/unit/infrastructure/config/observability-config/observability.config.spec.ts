// Mock elastic-apm-node before importing the module
jest.mock('elastic-apm-node', () => ({
  start: jest.fn(),
}))

import ObservabilityInit from '@infrastructure/config/observability-config/observability.config'

describe('ObservabilityInit', () => {
  let originalEnv: NodeJS.ProcessEnv
  let ObservabilityInit: any
  let elasticApmNode: any

  beforeAll(() => {
    jest.doMock('elastic-apm-node', () => ({
      start: jest.fn(),
    }))
  })

  beforeEach(() => {
    originalEnv = { ...process.env }
    process.env.ELASTIC_APM_SERVICE_NAME = 'test-service'
    process.env.ELASTIC_APM_SERVER_URL = 'http://localhost:8200'
    process.env.NODE_ENV = 'test'
    process.env.ELASTIC_APM_LOG_LEVEL = 'info'

    // Get the mocked module
    elasticApmNode = require('elastic-apm-node')

    // Import the module after mocking
    ObservabilityInit =
      require('@infrastructure/config/observability-config/observability.config').default
  })

  afterEach(() => {
    process.env = originalEnv
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.dontMock('elastic-apm-node')
  })

  it('should call elastic-apm-node.start with correct config', () => {
    ObservabilityInit.start()

    expect(elasticApmNode.start).toHaveBeenCalledWith({
      serviceName: 'test-service',
      serverUrl: 'http://localhost:8200',
      environment: 'test',
      logLevel: 'info',
      captureBody: 'all',
      captureHeaders: true,
      transactionSampleRate: 1.0,
      longFieldMaxLength: 10000,
    })
  })

  it('should catch and log error if elastic-apm-node.start fails', () => {
    const error = new Error('APM start failed')
    elasticApmNode.start.mockImplementation(() => {
      throw error
    })
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    ObservabilityInit.start()

    expect(elasticApmNode.start).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledWith(error)
    logSpy.mockRestore()
  })

  it('should handle different environment variables', () => {
    process.env.ELASTIC_APM_SERVICE_NAME = 'production-service'
    process.env.ELASTIC_APM_SERVER_URL = 'https://apm.production.com'
    process.env.NODE_ENV = 'production'
    process.env.ELASTIC_APM_LOG_LEVEL = 'error'

    ObservabilityInit.start()

    expect(elasticApmNode.start).toHaveBeenCalledWith({
      serviceName: 'production-service',
      serverUrl: 'https://apm.production.com',
      environment: 'production',
      logLevel: 'error',
      captureBody: 'all',
      captureHeaders: true,
      transactionSampleRate: 1.0,
      longFieldMaxLength: 10000,
    })
  })

  it('should handle missing environment variables', () => {
    delete process.env.ELASTIC_APM_SERVICE_NAME
    delete process.env.ELASTIC_APM_SERVER_URL
    delete process.env.NODE_ENV
    delete process.env.ELASTIC_APM_LOG_LEVEL

    ObservabilityInit.start()

    expect(elasticApmNode.start).toHaveBeenCalledWith({
      serviceName: undefined,
      serverUrl: undefined,
      environment: undefined,
      logLevel: undefined,
      captureBody: 'all',
      captureHeaders: true,
      transactionSampleRate: 1.0,
      longFieldMaxLength: 10000,
    })
  })
})
