import {
  winstonConfig,
  logger,
} from '@infrastructure/config/logger-config/logger-config'
import * as winston from 'winston'

describe('Winston Logger Config', () => {
  it('should have the correct log level and levels', () => {
    expect(winstonConfig.level).toBe('verbose')
    expect(winstonConfig.levels).toEqual(winston.config.npm.levels)
  })

  it('should have at least one transport', () => {
    expect(winstonConfig.transports).toBeDefined()
    expect(winstonConfig.transports[0]).toBeInstanceOf(
      winston.transports.Console,
    )
  })

  it('logger should be created by WinstonModule.createLogger', () => {
    expect(logger).toBeDefined()
    expect(typeof logger.log).toBe('function')
  })
})
