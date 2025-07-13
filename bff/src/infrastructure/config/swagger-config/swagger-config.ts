import { DocumentBuilder } from '@nestjs/swagger'

export const SWAGGER_CONFIG: any = {
  title: 'Brain Agriculture API',
  description: 'Documentação completa da API',
  version: '1.0',
}

export function createSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .setDescription(SWAGGER_CONFIG.description)
    .setVersion(SWAGGER_CONFIG.version)
    .build()
}
