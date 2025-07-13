import { INestApplication } from '@nestjs/common'
import { SwaggerModule } from '@nestjs/swagger'
import { setupSwagger } from '@infrastructure/http/swagger/setup.swagger'
import { createSwaggerConfig } from '@infrastructure/config/swagger-config/swagger-config'

jest.mock('@infrastructure/config/swagger-config/swagger-config')

describe('setupSwagger', () => {
  let app: INestApplication

  beforeEach(() => {
    app = {} as unknown as INestApplication

    jest
      .spyOn(SwaggerModule, 'createDocument')
      .mockReturnValue('document' as any)
    jest.spyOn(SwaggerModule, 'setup').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should create swagger document and setup swagger module', () => {
    ;(createSwaggerConfig as jest.Mock).mockReturnValue('config' as any)

    setupSwagger(app)

    expect(createSwaggerConfig).toHaveBeenCalled()
    expect(SwaggerModule.createDocument).toHaveBeenCalledWith(app, 'config')
    expect(SwaggerModule.setup).toHaveBeenCalledWith('api', app, 'document', {
      customSiteTitle: 'Brain Agriculture',
      swaggerOptions: {
        docExpansion: 'none',
        filter: false,
        displayRequestDuration: true,
      },
    })
  })
})
