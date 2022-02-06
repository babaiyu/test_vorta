import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { PatientsDTO } from './patients.dto';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Get()
  async showAll() {
    const patients = await this.patientsService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: '',
      patients,
    };
  }

  // @Get(':id')
  // async showById(@Param('id') id: number) {
  //   const patient = await this.patientsService.showByID(id);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: '',
  //     patient,
  //   };
  // }

  @Get(':name')
  async showByName(@Param('name') name: string) {
    const patient = await this.patientsService.showByName(name);
    return {
      statusCode: HttpStatus.OK,
      message: '',
      patient,
    };
  }

  @Post()
  async create(@Body() data: PatientsDTO) {
    const patient = await this.patientsService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Patient added successfully',
      patient,
    };
  }
}
