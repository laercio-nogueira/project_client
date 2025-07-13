import { InternalServerErrorException } from '@nestjs/common'
import { QueryFailedError } from 'typeorm'

export class ForeingKeyConstraintException {
  constructor(error: Error, message) {
    if (
      error instanceof QueryFailedError &&
      error.message.includes('foreign key constraint')
    ) {
      throw new InternalServerErrorException(message)
    } else {
      throw error
    }
  }
}
