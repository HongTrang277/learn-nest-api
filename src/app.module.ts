import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LicensesModule } from './licenses/licenses.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { simpleLoggerMiddleware } from './middlewares/simple-logger.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ihchang277_db_user:d2CazcSvuISJNYCk@cluster0.haly2hc.mongodb.net/?appName=Cluster0'),
    LicensesModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)

      .forRoutes({ path: '*', method: RequestMethod.ALL })

      .apply(simpleLoggerMiddleware)
      .forRoutes({ path: 'licenses', method: RequestMethod.GET });
  }
}
