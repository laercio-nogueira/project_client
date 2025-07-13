import { Logger, Module } from '@nestjs/common'
import { UserQueueService } from './user-queue.service'
import { UserQueueController } from './user-queue.controller'
import { CreateUserUseCase } from '@application/usecases/user/create-user.usecase'
import { UserRepository } from '@infrastructure/database/repositories/user-repository'

@Module({
  providers: [UserQueueService, CreateUserUseCase, UserRepository, Logger],
  controllers: [UserQueueController],
  exports: [UserQueueService],
})
export class UserQueueModule {}
