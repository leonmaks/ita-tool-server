import { ValidationPipe, Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

import { AppPort, ApiGlobalPfx } from './app.config'
import { AppModule } from './app.module'
// import { TransformInterceptor } from './transform.interceptor'

async function main() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule)
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  // TODO: remove CORS in production!
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix(ApiGlobalPfx)
  // app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(AppPort)
  logger.log(`Application is running on: ${await app.getUrl()}`)
}
main()
