import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { EnvironmentConfigModule } from '../environment-config/environment-config.module'
import { EnvironmentConfigService } from '../environment-config/environment-config.service'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: (config: EnvironmentConfigService): TypeOrmModuleOptions => ({
        type: config.getDatabaseType(),
        host: config.getDatabaseHost(),
        port: config.getDatabasePort(),
        username: config.getDatabaseUser(),
        password: config.getDatabasePassword(),
        database: config.getDatabaseName(),
        entities: [__dirname + './../../database/entities/*.entity.{ts,js}'],
        synchronize: true,
        schema: process.env.DATABASE_SCHEMA,
        ssl: false,
      }),
    }),
  ],
})
export class TypeOrmConfigModule {}
