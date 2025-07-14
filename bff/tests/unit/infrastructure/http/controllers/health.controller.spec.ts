import { Test, TestingModule } from '@nestjs/testing'
import { HealthController } from '@infrastructure/http/controllers/health.controller'

describe('HealthController', () => {
  let controller: HealthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile()

    controller = module.get<HealthController>(HealthController)
  })

  describe('check', () => {
    it('should return health status', () => {
      // Act
      const result = controller.check()

      // Assert
      expect(result).toEqual({ message: 'OK' })
    })

    it('should always return the same health message', () => {
      // Act
      const result1 = controller.check()
      const result2 = controller.check()

      // Assert
      expect(result1).toEqual(result2)
      expect(result1).toEqual({ message: 'OK' })
    })
  })
})
