import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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

  @Get('getByName')
  async showByName(@Query('name') name: string) {
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

  @Patch('changeStatus/:id')
  async changeStatus(
    @Param('id') id: number,
    @Body() data: { isActive: boolean },
  ) {
    const patient = await this.patientsService.changeStatus(id, data.isActive);
    return {
      statusCode: HttpStatus.OK,
      message: 'Patient change status is successfully',
      patient,
    };
  }

  @Patch(':id')
  async updatePatient(
    @Param('id') id: number,
    @Body() data: Partial<PatientsDTO>,
  ) {
    const patient = await this.patientsService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Patient updated successfully',
      patient,
    };
  }

  @Delete(':id')
  async deletePatient(@Param('id') id: number) {
    await this.patientsService.delete(id);
    return {
      statusCode: 200,
      message: 'Patient deleted successfully',
    };
  }
}
