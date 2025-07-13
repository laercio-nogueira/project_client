import { UpdateUserDto } from '@application/dto/user/update-user.dto'

describe('UpdateUserDto', () => {
  it('should be defined', () => {
    expect(new UpdateUserDto()).toBeDefined()
  })
})
