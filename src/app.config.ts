import { join } from 'path'

export const
  AppPfx = 'ita',
  HashSaltRounds = 12,
  AppPort = 7999,
  ApiGlobalPfx = 'api',
  JwtSecretEnv = 'JWT_SECRET',
  JwtExpiresIn = '24h',
  EnvProd = 'prod',
  EnvDev = 'dev',
  EnvProdOptions = ['production', 'product', 'prod', 'pro']

export const currentEnv = () => (
  (EnvProdOptions.indexOf(process.env.STAGE || EnvDev) > -1) ? EnvProd : EnvDev
)

export const isProduction = () => currentEnv() === EnvProd

export const graphqlSchemaPath = join(process.cwd(), 'src/schema.gql')
