import {
  Injectable,
  Inject,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common'
import { Logger } from 'winston'
import { Observable } from 'rxjs'
import { ObservabilityService } from '../observability-config/observability.config.service'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly index = 'logger'

  constructor(
    @Inject('winston') private logger: Logger,
    private observabilityService: ObservabilityService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.log(context.switchToHttp().getRequest())
    return next.handle()
  }

  private log(req) {
    const body = { ...req.body }
    const user = (req as any).user
    const timestamp = new Date().toISOString()
    const data = {
      timestamp,
      method: req.method,
      route: req.route.path,
      data: {
        body: JSON.stringify(body),
        query: req.query,
        params: req.params,
      },
    }

    this.logger.info(JSON.stringify(data))
    this.observabilityService.indexDocument(timestamp, data)
  }
}
