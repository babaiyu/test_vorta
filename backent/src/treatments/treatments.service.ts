import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TreatmentsDTO } from './treatments.dto';
import { TreatmentsEntity } from './treatments.entity';

@Injectable()
export class TreatmentsService {
  constructor(
    @InjectRepository(TreatmentsEntity)
    private treatmentsRepository: Repository<TreatmentsEntity>,
  ) {}

  async showAll() {
    return await this.treatmentsRepository.find();
  }

  async create(data: TreatmentsDTO) {
    const treatment = this.treatmentsRepository.create(data);
    await this.treatmentsRepository.save(treatment);
    return treatment;
  }
}
