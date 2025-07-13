import { Module } from '@nestjs/common'
import { ElasticsearchModule } from '@nestjs/elasticsearch'
import { ObservabilityService } from './observability.config.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ObservabilityService],
  exports: [ObservabilityService],
})
export class ObservabilityModule {}
