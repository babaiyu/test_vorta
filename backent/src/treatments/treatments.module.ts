import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentsEntity } from './treatments.entity';
import { TreatmentsService } from './treatments.service';
import { TreatmentsController } from './treatments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TreatmentsEntity])],
  providers: [TreatmentsService],
  controllers: [TreatmentsController],
})
export class TreatmentsModule {}
