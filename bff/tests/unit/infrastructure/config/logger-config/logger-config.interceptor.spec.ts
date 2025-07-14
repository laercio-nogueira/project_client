import { Test, TestingModule } from '@nestjs/testing'
import { LoggerInterceptor } from '@infrastructure/config/logger-config/logger-config.interceptor'
import { ObservabilityService } from '@infrastructure/config/observability-config/observability.config.service'
import { ExecutionContext, CallHandler } from '@nestjs/common'
import { Logger } from 'winston'
import { of } from 'rxjs'

describe('LoggerInterceptor', () => {
  let interceptor: LoggerInterceptor
  let mockLogger: jest.Mocked<Logger>
  let mockObservabilityService: jest.Mocked<ObservabilityService>
  let mockExecutionContext: jest.Mocked<ExecutionContext>
  let mockCallHandler: jest.Mocked<CallHandler>

  beforeEach(async () => {
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    } as any

    mockObservabilityService = {
      indexDocument: jest.fn(),
    } as any

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerInterceptor,
        {
          provide: 'winston',
          useValue: mockLogger,
        },
        {
          provide: ObservabilityService,
          useValue: mockObservabilityService,
        },
      ],
    }).compile()

    interceptor = module.get<LoggerInterceptor>(LoggerInterceptor)
  })

  describe('intercept', () => {
    it('should log request and call next handler', () => {
      // Arrange
      const mockRequest = {
        method: 'POST',
        route: { path: '/users' },
        body: { name: 'John', salary: 1000 },
        query: { page: '1' },
        params: { id: '123' },
      }

      mockExecutionContext = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue(mockRequest),
        }),
      } as any

      mockCallHandler = {
        handle: jest.fn().mockReturnValue(of({ success: true })),
      } as any

      // Act
      const result = interceptor.intercept(
        mockExecutionContext,
        mockCallHandler,
      )

      // Assert
      expect(mockLogger.info).toHaveBeenCalled()
      expect(mockObservabilityService.indexDocument).toHaveBeenCalled()
      expect(mockCallHandler.handle).toHaveBeenCalled()
      expect(result).toBeDefined()
    })

    it('should handle request with user data', () => {
      // Arrange
      const mockRequest = {
        method: 'GET',
        route: { path: '/users/123' },
        body: {},
        query: {},
        params: { id: '123' },
        user: { id: 'user-123', name: 'John' },
      }

      mockExecutionContext = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue(mockRequest),
        }),
      } as any

      mockCallHandler = {
        handle: jest.fn().mockReturnValue(of({ success: true })),
      } as any

      // Act
      interceptor.intercept(mockExecutionContext, mockCallHandler)

      // Assert
      expect(mockLogger.info).toHaveBeenCalled()
      expect(mockObservabilityService.indexDocument).toHaveBeenCalled()
    })

    it('should handle request without body', () => {
      // Arrange
      const mockRequest = {
        method: 'DELETE',
        route: { path: '/users/123' },
        body: undefined,
        query: {},
        params: { id: '123' },
      }

      mockExecutionContext = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue(mockRequest),
        }),
      } as any

      mockCallHandler = {
        handle: jest.fn().mockReturnValue(of({ success: true })),
      } as any

      // Act
      interceptor.intercept(mockExecutionContext, mockCallHandler)

      // Assert
      expect(mockLogger.info).toHaveBeenCalled()
      expect(mockObservabilityService.indexDocument).toHaveBeenCalled()
    })

    it('should handle complex request data', () => {
      // Arrange
      const mockRequest = {
        method: 'PUT',
        route: { path: '/users/123' },
        body: {
          name: 'Jane',
          salary: 5000,
          enterprise: 100000,
          metadata: { department: 'IT', role: 'Developer' },
        },
        query: {
          include: 'details',
          filter: 'active',
        },
        params: {
          id: '123',
          action: 'update',
        },
      }

      mockExecutionContext = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue(mockRequest),
        }),
      } as any

      mockCallHandler = {
        handle: jest.fn().mockReturnValue(of({ success: true })),
      } as any

      // Act
      interceptor.intercept(mockExecutionContext, mockCallHandler)

      // Assert
      expect(mockLogger.info).toHaveBeenCalled()
      expect(mockObservabilityService.indexDocument).toHaveBeenCalled()
    })
  })
})
