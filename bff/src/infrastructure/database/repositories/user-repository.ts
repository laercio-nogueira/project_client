import { UserEntity } from '@infrastructure/database/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { Repository, DataSource } from 'typeorm'

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private user: DataSource) {
    super(UserEntity, user.createEntityManager())
  }
}
