import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationsDTO } from './locations.dto';
import { LocationsEntity } from './locations.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationsEntity)
    private locationsRepository: Repository<LocationsEntity>,
  ) {}

  async showAll() {
    return await this.locationsRepository.find();
  }

  async create(data: LocationsDTO) {
    const location = this.locationsRepository.create(data);
    await this.locationsRepository.save(location);
    return location;
  }
}
