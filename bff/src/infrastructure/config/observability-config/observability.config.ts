// import elasticSearchNode from 'elastic-apm-node' // Removido para usar require dinâmico

type LogLevel =
  | 'trace'
  | 'debug'
  | 'info'
  | 'warn'
  | 'warning'
  | 'error'
  | 'fatal'
  | 'critical'
  | 'off'

interface ParamsProps {
  serviceName: string
  serverUrl: string
  environment: string
  logLevel: LogLevel
  captureBody: 'all'
  captureHeaders: boolean
  transactionSampleRate: number
  longFieldMaxLength: number
}
class ObservabilityInit {
  public static start() {
    const params: ParamsProps = {
      serviceName: process.env.ELASTIC_APM_SERVICE_NAME,
      serverUrl: process.env.ELASTIC_APM_SERVER_URL,
      environment: process.env.NODE_ENV,
      logLevel: process.env.ELASTIC_APM_LOG_LEVEL as LogLevel,
      captureBody: 'all',
      captureHeaders: true,
      transactionSampleRate: 1.0,
      longFieldMaxLength: 10000,
    }

    try {
      // Use require dinâmico para permitir mock em testes
      const elasticSearchNode = require('elastic-apm-node')
      elasticSearchNode.start(params)
    } catch (err) {
      console.log(err)
    }
  }
}

export default ObservabilityInit
