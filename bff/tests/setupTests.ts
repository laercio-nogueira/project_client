import * as crypto from 'crypto'

global.crypto = {
  getRandomValues: (buffer: any) => {
    return crypto.randomFillSync(buffer)
  },
  randomUUID: () => crypto.randomUUID(),
} as any
