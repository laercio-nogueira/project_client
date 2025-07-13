import { ForeingKeyConstraintException } from '@application/exceptions/foreign-key-constraint.exception'
import { InternalServerErrorException } from '@nestjs/common'
import { QueryFailedError } from 'typeorm'

describe('ForeingKeyConstraintException', () => {
  const message = 'Custom foreign key error message'

  it('should throw InternalServerErrorException if error is a QueryFailedError with foreign key constraint message', () => {
    const error = new QueryFailedError(
      'DELETE FROM child',
      [],
      new Error('foreign key constraint fails'),
    )

    expect(() => {
      new ForeingKeyConstraintException(error, message)
    }).toThrowError(InternalServerErrorException)

    try {
      new ForeingKeyConstraintException(error, message)
    } catch (err) {
      expect(err.message).toContain(message)
    }
  })

  it('should throw the original error if it is not a foreign key constraint error', () => {
    const error = new Error('Some other database error')

    expect(() => {
      new ForeingKeyConstraintException(error, message)
    }).toThrow(error)
  })
})
