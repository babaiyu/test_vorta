import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientsDTO } from './patients.dto';
import { PatientsEntity } from './patients.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(PatientsEntity)
    private patientsRepository: Repository<PatientsEntity>,
  ) {}

  async showAll(): Promise<PatientsEntity[]> {
    return await this.patientsRepository
      .createQueryBuilder('patients')
      .innerJoinAndSelect('patients.treatment', 'treatments')
      .innerJoinAndSelect('patients.location', 'locations')
      .getMany();
  }

  async showByID(id_number: number): Promise<PatientsEntity> {
    return await this.patientsRepository
      .createQueryBuilder('patients')
      .innerJoinAndSelect('patients.treatment', 'treatments')
      .innerJoinAndSelect('patients.location', 'locations')
      .where('patients.id_number = :id_number', { id_number })
      .getOne();
  }

  async showByName(name: string): Promise<PatientsEntity[]> {
    return await this.patientsRepository
      .createQueryBuilder('patients')
      .innerJoinAndSelect('patients.treatment', 'treatments')
      .innerJoinAndSelect('patients.location', 'locations')
      .where('patients.name like :name', { name: `%${name}%` })
      .getMany();
  }

  async create(data: PatientsDTO): Promise<PatientsEntity> {
    let payload = data;
    payload.id_number = String(Date.now());

    const patient = this.patientsRepository.create(payload);
    await this.patientsRepository.save(patient);
    return patient;
  }

  async changeStatus(id: number, isActive: boolean): Promise<PatientsEntity> {
    let data = await this.patientsRepository.findOne({ where: { id } });
    data.is_active = isActive;
    await this.patientsRepository.update({ id }, data);

    return data;
  }

  async update(id: number, data: Partial<PatientsDTO>) {
    await this.patientsRepository.update({ id }, data);
    return await this.patientsRepository.findOne({ where: { id } });
  }
}
