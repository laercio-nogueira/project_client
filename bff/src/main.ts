require('dotenv').config()
import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common'
import { setupSwagger } from '@infrastructure/http/swagger/setup.swagger'
import helmet from 'helmet'
import { logger } from '@infrastructure/config/logger-config/logger-config'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import ObservabilityInit from '@infrastructure/config/observability-config/observability.config'
import rabbitMQConfig from '@infrastructure/config/queues-config/queues-config'

async function bootstrap() {
  ObservabilityInit.start()
  const app = await NestFactory.create(AppModule, { logger })
  app.use(helmet())
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.enableCors()
  setupSwagger(app)

  app.connectMicroservice(rabbitMQConfig())
  await app.startAllMicroservices()
  await app.listen(process.env.BACKEND_PORT ?? 3000)
}
bootstrap()
