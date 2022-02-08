import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsEntity } from './patients.entity';
import { TreatmentsEntity } from 'src/treatments/treatments.entity';
import { LocationsEntity } from 'src/locations/locations.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PatientsEntity,
      TreatmentsEntity,
      LocationsEntity,
    ]),
  ],
  providers: [PatientsService],
  controllers: [PatientsController],
})
export class PatientsModule {}
