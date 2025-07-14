import { Test, TestingModule } from '@nestjs/testing'
import { ObservabilityModule } from '@infrastructure/config/observability-config/observability.config.module'
import { ObservabilityService } from '@infrastructure/config/observability-config/observability.config.service'
import { ConfigService } from '@nestjs/config'

// Mock do ElasticsearchModule
jest.mock('@nestjs/elasticsearch', () => ({
  ElasticsearchModule: {
    registerAsync: jest.fn(() => ({
      module: class MockElasticsearchModule {},
      providers: [],
    })),
  },
}))

describe('ObservabilityModule', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ObservabilityModule],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: jest.fn((key: string) => {
          if (key === 'ELASTICSEARCH_NODE') {
            return 'http://localhost:9200'
          }
          return undefined
        }),
      })
      .overrideProvider(ObservabilityService)
      .useValue({
        search: jest.fn(),
        indexDocument: jest.fn(),
      })
      .compile()
  })

  it('should be defined', () => {
    expect(module).toBeDefined()
  })

  it('should provide ObservabilityService', () => {
    const service = module.get<ObservabilityService>(ObservabilityService)
    expect(service).toBeDefined()
  })

  it('should export ObservabilityService', () => {
    const service = module.get<ObservabilityService>(ObservabilityService)
    expect(service).toBeDefined()
  })
})
