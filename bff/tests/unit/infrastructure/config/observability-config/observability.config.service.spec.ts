import { Test, TestingModule } from '@nestjs/testing'
import { ObservabilityService } from '@infrastructure/config/observability-config/observability.config.service'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/types'

describe('ObservabilityService', () => {
  let service: ObservabilityService
  let mockElasticsearchService: jest.Mocked<ElasticsearchService>

  beforeEach(async () => {
    mockElasticsearchService = {
      search: jest.fn(),
      index: jest.fn(),
    } as any

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObservabilityService,
        {
          provide: ElasticsearchService,
          useValue: mockElasticsearchService,
        },
      ],
    }).compile()

    service = module.get<ObservabilityService>(ObservabilityService)
  })

  describe('search', () => {
    it('should search documents with correct parameters', async () => {
      // Arrange
      const mockQuery: QueryDslQueryContainer = {
        match: {
          field: 'value',
        },
      }
      const mockResponse = {
        hits: {
          total: { value: 1 },
          hits: [{ _source: { id: '1', data: 'test' } }],
        },
      }
      mockElasticsearchService.search.mockResolvedValue(mockResponse as any)

      // Act
      const result = await service.search(mockQuery)

      // Assert
      expect(mockElasticsearchService.search).toHaveBeenCalledWith({
        index: 'application',
        body: {
          query: mockQuery,
        },
      })
      expect(result).toEqual(mockResponse)
    })

    it('should handle complex search queries', async () => {
      // Arrange
      const mockQuery: QueryDslQueryContainer = {
        bool: {
          must: [{ match: { name: 'John' } }, { range: { age: { gte: 18 } } }],
        },
      }
      const mockResponse = {
        hits: {
          total: { value: 2 },
          hits: [
            { _source: { id: '1', name: 'John', age: 25 } },
            { _source: { id: '2', name: 'John', age: 30 } },
          ],
        },
      }
      mockElasticsearchService.search.mockResolvedValue(mockResponse as any)

      // Act
      const result = await service.search(mockQuery)

      // Assert
      expect(mockElasticsearchService.search).toHaveBeenCalledWith({
        index: 'application',
        body: {
          query: mockQuery,
        },
      })
      expect(result).toEqual(mockResponse)
    })
  })

  describe('indexDocument', () => {
    it('should index document with correct parameters', async () => {
      // Arrange
      const mockId = 'doc-123'
      const mockDocument = {
        timestamp: '2024-01-01T00:00:00Z',
        method: 'POST',
        route: '/users',
        data: { name: 'John' },
      }
      const mockResponse = {
        _index: 'application',
        _id: mockId,
        result: 'created',
      }
      mockElasticsearchService.index.mockResolvedValue(mockResponse as any)

      // Act
      const result = await service.indexDocument(mockId, mockDocument)

      // Assert
      expect(mockElasticsearchService.index).toHaveBeenCalledWith({
        index: 'application',
        id: mockId,
        body: mockDocument,
      })
      expect(result).toEqual(mockResponse)
    })

    it('should handle different document types', async () => {
      // Arrange
      const mockId = 'log-456'
      const mockDocument = {
        level: 'info',
        message: 'User created successfully',
        metadata: {
          userId: 'user-123',
          action: 'create',
          timestamp: new Date().toISOString(),
        },
      }
      const mockResponse = {
        _index: 'application',
        _id: mockId,
        result: 'created',
      }
      mockElasticsearchService.index.mockResolvedValue(mockResponse as any)

      // Act
      const result = await service.indexDocument(mockId, mockDocument)

      // Assert
      expect(mockElasticsearchService.index).toHaveBeenCalledWith({
        index: 'application',
        id: mockId,
        body: mockDocument,
      })
      expect(result).toEqual(mockResponse)
    })

    it('should handle empty document', async () => {
      // Arrange
      const mockId = 'empty-doc'
      const mockDocument = {}
      const mockResponse = {
        _index: 'application',
        _id: mockId,
        result: 'created',
      }
      mockElasticsearchService.index.mockResolvedValue(mockResponse as any)

      // Act
      const result = await service.indexDocument(mockId, mockDocument)

      // Assert
      expect(mockElasticsearchService.index).toHaveBeenCalledWith({
        index: 'application',
        id: mockId,
        body: mockDocument,
      })
      expect(result).toEqual(mockResponse)
    })
  })
})
