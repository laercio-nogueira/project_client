import {
  createSwaggerConfig,
  SWAGGER_CONFIG,
} from '@infrastructure/config/swagger-config/swagger-config'

describe('Swagger Config', () => {
  it('should create swagger config with correct title, description and version', () => {
    const config = createSwaggerConfig()

    expect(config).toHaveProperty('info')
    expect(config.info.title).toBe(SWAGGER_CONFIG.title)
    expect(config.info.description).toBe(SWAGGER_CONFIG.description)
    expect(config.info.version).toBe(SWAGGER_CONFIG.version)
  })
})
