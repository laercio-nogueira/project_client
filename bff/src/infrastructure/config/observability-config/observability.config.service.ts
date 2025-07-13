import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/types'

@Injectable()
export class ObservabilityService {
  private readonly index = 'application'

  constructor(private readonly observabilityService: ElasticsearchService) {}

  async search<T>(query: QueryDslQueryContainer) {
    return this.observabilityService.search<T>({
      index: this.index,
      body: {
        query,
      } as any,
    })
  }

  async indexDocument<T>(id: string, document: any) {
    return this.observabilityService.index<T>({
      index: this.index,
      id,
      body: document,
    })
  }
}
