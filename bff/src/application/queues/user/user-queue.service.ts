import rabbitMQConfig from '@infrastructure/config/queues-config/queues-config'
import { Injectable } from '@nestjs/common'
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices'

@Injectable()
export class UserQueueService {
  private client: ClientProxy

  constructor() {
    this.client = ClientProxyFactory.create(rabbitMQConfig())
  }

  async createUserJob(userData: any) {
    return await this.client.emit('create-user', userData)
  }
}
