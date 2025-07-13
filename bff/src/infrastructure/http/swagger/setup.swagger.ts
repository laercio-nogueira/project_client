import { INestApplication } from '@nestjs/common'
import { SwaggerModule } from '@nestjs/swagger'
import { createSwaggerConfig } from '@infrastructure/config/swagger-config/swagger-config'

export function setupSwagger(app: INestApplication) {
  const config = createSwaggerConfig()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Teddy Open Finance',
    swaggerOptions: {
      docExpansion: 'none',
      filter: false,
      displayRequestDuration: true,
    },
  })
}
