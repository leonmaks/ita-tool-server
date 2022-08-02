import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ConsoleModule } from 'nestjs-console'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { WinstonModule } from 'nest-winston'
import { LoggerConfig } from './logger-config'
import { currentEnv, graphqlSchemaPath, isProduction } from './app.config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { RepoModule } from './ita/repo/repo.module'
import { TaskModule } from './task/task.module'
import { ElementModule } from './element/element.module'
import { configValidationSchema as validationSchema } from './config.schema'
import { AdminConsoleService } from './admin-console.service'
import { ImpModule } from './imp/imp.module'
import { GacModule } from './gac/gac.module'

const logger: LoggerConfig = new LoggerConfig()

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${currentEnv()}`],
      validationSchema,
    }),
    WinstonModule.forRoot(logger.console()),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: graphqlSchemaPath,
      sortSchema: true,
      // installSubscriptionHandlers: true,
      // debug: true,
      // playground: true,
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        // TODO: delete logs:
        // console.log('XXX: DB_HOST=', configService.get('DB_HOST'))
        // console.log('XXX: DB_PORT=', configService.get('DB_PORT'))
        // console.log('XXX: DB_USER=', configService.get('DB_USER'))
        // console.log('XXX: DB_PSWD=', configService.get('DB_PSWD'))
        // console.log('XXX: DB_NAME=', configService.get('DB_NAME'))

        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PSWD'),
          database: configService.get('DB_NAME'),
          autoLoadEntities: true,
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
          namingStrategy: new SnakeNamingStrategy(),
          // TODO: remove logging in prod.
          logging: true,
        }
      },
    }),
    UserModule,
    AuthModule,
    ElementModule,
    RepoModule,
    TaskModule,
    ImpModule,
    GacModule,
    ConsoleModule,
  ],
  providers: [AdminConsoleService],
  exports: [AdminConsoleService],
})
export class AppModule {}
