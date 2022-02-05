import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsEntity } from './locations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationsEntity])],
  providers: [LocationsService],
  controllers: [LocationsController],
})
export class LocationsModule {}
