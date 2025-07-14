import * as crypto from 'crypto'
import 'reflect-metadata'

global.crypto = {
  getRandomValues: (buffer: any) => {
    return crypto.randomFillSync(buffer)
  },
  randomUUID: () => crypto.randomUUID(),
} as any
