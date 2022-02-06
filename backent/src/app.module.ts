import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersEntity } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { TreatmentsEntity } from './treatments/treatments.entity';
import { LocationsModule } from './locations/locations.module';
import { LocationsEntity } from './locations/locations.entity';
import { PatientsModule } from './patients/patients.module';
import { PatientsEntity } from './patients/patients.entity';

import env from './env';

const entities = [
  UsersEntity,
  TreatmentsEntity,
  LocationsEntity,
  PatientsEntity,
];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.HOST,
      port: env.PORT,
      username: env.USERNAME,
      password: env.PASSWORD,
      database: env.DATABASE,
      entities,
    }),
    UsersModule,
    TreatmentsModule,
    LocationsModule,
    PatientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
