import { Module } from '@nestjs/common'
import { EnvironmentConfigService } from './environment-config.service'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  providers: [EnvironmentConfigService, ConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule extends ConfigModule {}
