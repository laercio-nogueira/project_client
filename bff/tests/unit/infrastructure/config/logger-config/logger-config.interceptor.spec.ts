import { LoggerInterceptor } from '@infrastructure/config/logger-config/logger-config.interceptor'
import { ExecutionContext, CallHandler } from '@nestjs/common'
import { of } from 'rxjs'

describe('LoggerInterceptor', () => {
  let interceptor: LoggerInterceptor
  let mockLogger: any

  beforeEach(() => {
    mockLogger = {
      info: jest.fn(),
    }
    interceptor = new LoggerInterceptor(mockLogger)
  })

  it('should call logger.info with correct log object', done => {
    const mockRequest = {
      method: 'POST',
      route: { path: '/test' },
      body: { key: 'value' },
      query: { q: 'query' },
      params: { id: '123' },
      user: { name: 'user1' },
    }

    const context = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext

    const callHandler: CallHandler = {
      handle: () => of('response'),
    }

    interceptor.intercept(context, callHandler).subscribe({
      next: value => {
        expect(value).toBe('response')

        expect(mockLogger.info).toHaveBeenCalled()

        const loggedArg = mockLogger.info.mock.calls[0][0]
        const loggedObj = JSON.parse(loggedArg)

        expect(loggedObj.method).toBe('POST')
        expect(loggedObj.route).toBe('/test')
        expect(JSON.parse(loggedObj.data.body)).toEqual({ key: 'value' })
        expect(loggedObj.data.query).toEqual({ q: 'query' })
        expect(loggedObj.data.params).toEqual({ id: '123' })
        expect(loggedObj.data.user).toEqual({ name: 'user1' })
        expect(typeof loggedObj.timestamp).toBe('string')

        done()
      },
      error: done.fail,
    })
  })
})
