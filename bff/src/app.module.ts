import { Logger, Module, OnModuleInit } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module'
import { TypeOrmConfigModule } from './infrastructure/config/typeorm-config/typeorm-config.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LoggerInterceptor } from '@infrastructure/config/logger-config/logger-config.interceptor'
import { WinstonModule } from 'nest-winston'
import { winstonConfig } from '@infrastructure/config/logger-config/logger-config'
import { TerminusModule } from '@nestjs/terminus'
import { UserQueueModule } from '@application/queues/user/user-queue.module'
import { ObservabilityModule } from '@infrastructure/config/observability-config/observability.config.module'

import { UserController } from '@infrastructure/http/controllers/user.controller'
import { HealthController } from '@infrastructure/http/controllers/health.controller'

import { UserService } from '@domain/services/user.service'
import { UserRepository } from '@infrastructure/database/repositories/user-repository'
import { UserEntity } from '@infrastructure/database/entities/user.entity'
import { CreateUserUseCase } from '@application/usecases/user/create-user.usecase'
import { FindUserUseCase } from '@application/usecases/user/find-user.usecase'
import { UpdateUserUseCase } from '@application/usecases/user/update-user.usecase'
import { DeleteUserUseCase } from '@application/usecases/user/delete-user.usecase'
import { UserQueueService } from '@application/queues/user/user-queue.service'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRoot(winstonConfig),
    TypeOrmModule.forFeature([UserEntity]),
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    TerminusModule,
    ObservabilityModule,
    UserQueueModule,
  ],
  controllers: [UserController, HealthController],
  providers: [
    UserRepository,
    CreateUserUseCase,
    FindUserUseCase,
    ConfigService,
    UserService,
    UpdateUserUseCase,
    DeleteUserUseCase,
    UserQueueService,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor() {}

  async onModuleInit() {}
}
