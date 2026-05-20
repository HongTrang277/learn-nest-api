import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LicensesModule } from '@/licenses/licenses.module';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { LoggerMiddleware } from '@/middlewares/logger.middleware';
import { simpleLoggerMiddleware } from '@/middlewares/simple-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: () => ({ uri: process.env.MONGODB_URI }),
    }),
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
