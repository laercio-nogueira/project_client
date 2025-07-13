export interface EnvConfigInterface {
  getNodeEnv(): string
  getDatabaseHost(): string
  getDatabasePort(): number
  getDatabaseUser(): string
  getDatabasePassword(): string
  getDatabaseName(): string
  getDatabaseSchema(): string
  getDatabaseSync(): boolean
}

export type TypeDatabaseInterface = 'postgres' | 'mysql' | 'mariadb'
