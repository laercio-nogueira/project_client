import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { EnvironmentConfigService } from '@infrastructure/config/environment-config/environment-config.service'
import { TypeDatabaseInterface } from '@infrastructure/config/environment-config/environment-config.interface'

describe('EnvironmentConfigService', () => {
  let service: EnvironmentConfigService
  let configService: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnvironmentConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<EnvironmentConfigService>(EnvironmentConfigService)
    configService = module.get<ConfigService>(ConfigService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return correct values from ConfigService', () => {
    ;(configService.get as jest.Mock).mockImplementation((key: string) => {
      const values: Record<string, any> = {
        NODE_ENV: 'production',
        DB_TYPE: 'postgres' as TypeDatabaseInterface,
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_USERNAME: 'user',
        DB_PASSWORD: 'pass',
        DB_NAME: 'mydb',
        DB_SCHEMA: 'public',
        DB_SYNC: true,
      }
      return values[key]
    })

    expect(service.getNodeEnv()).toBe('production')
    expect(service.getDatabaseType()).toBe('postgres')
    expect(service.getDatabaseHost()).toBe('localhost')
    expect(service.getDatabasePort()).toBe(5432)
    expect(service.getDatabaseUser()).toBe('user')
    expect(service.getDatabasePassword()).toBe('pass')
    expect(service.getDatabaseName()).toBe('mydb')
    expect(service.getDatabaseSchema()).toBe('public')
    expect(service.getDatabaseSync()).toBe(true)
  })

  it('should return default node env when NODE_ENV is not set', () => {
    ;(configService.get as jest.Mock).mockImplementation((key: string) => {
      if (key === 'NODE_ENV') return undefined
      return 'any'
    })

    expect(service.getNodeEnv()).toBe('development')
  })
})
