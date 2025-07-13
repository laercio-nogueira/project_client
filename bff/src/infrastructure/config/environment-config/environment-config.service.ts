import { Injectable } from '@nestjs/common'
import {
  EnvConfigInterface,
  TypeDatabaseInterface,
} from './environment-config.interface'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EnvironmentConfigService implements EnvConfigInterface {
  constructor(private configService: ConfigService) {}
  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') || 'development'
  }

  getDatabaseType(): TypeDatabaseInterface {
    return this.configService.get<TypeDatabaseInterface>('DB_TYPE')
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DB_HOST')
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DB_PORT')
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DB_USERNAME')
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DB_PASSWORD')
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DB_NAME')
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DB_SCHEMA')
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DB_SYNC')
  }
}
