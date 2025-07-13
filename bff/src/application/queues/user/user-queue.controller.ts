import { CreateUserDto } from '@application/dto/user/create-user.dto'
import { CreateUserUseCase } from '@application/usecases/user/create-user.usecase'
import { Controller, Inject, Logger, LoggerService } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'

@Controller()
export class UserQueueController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}
  @EventPattern('create-user')
  async handleMessage(user: CreateUserDto) {
    this.logger.log('Creating user')
    return await this.createUserUseCase.execute(user)
  }
}
