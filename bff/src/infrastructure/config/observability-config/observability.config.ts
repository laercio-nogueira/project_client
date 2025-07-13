class ObservabilityInit {
  public static start() {
    try {
      require('elastic-apm-node').start({
        serviceName: process.env.ELASTIC_APM_SERVICE_NAME,
        serverUrl: process.env.ELASTIC_APM_SERVER_URL,
        environment: process.env.NODE_ENV,
        active: process.env.ELASTIC_APM_ACTIVE,
        logLevel: process.env.ELASTIC_APM_LOG_LEVEL,
        captureBody: 'all',
        captureHeaders: true,
        transactionSampleRate: 1.0,
        longFieldMaxLength: 10000,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export default ObservabilityInit
