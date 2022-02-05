import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersEntity } from './users/users.entity';
import { UsersModule } from './users/users.module';
import env from './env';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.HOST,
      port: env.PORT,
      username: env.USERNAME,
      password: env.PASSWORD,
      database: env.DATABASE,
      entities: [UsersEntity],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
