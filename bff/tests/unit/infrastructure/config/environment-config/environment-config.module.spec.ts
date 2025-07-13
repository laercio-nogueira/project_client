import { Test, TestingModule } from '@nestjs/testing'
import { EnvironmentConfigModule } from '@infrastructure/config/environment-config/environment-config.module'
import { EnvironmentConfigService } from '@infrastructure/config/environment-config/environment-config.service'

describe('EnvironmentConfigModule', () => {
  let service: EnvironmentConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentConfigModule],
    }).compile()

    service = module.get<EnvironmentConfigService>(EnvironmentConfigService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
