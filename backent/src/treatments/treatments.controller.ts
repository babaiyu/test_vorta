import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { TreatmentsDTO } from './treatments.dto';
import { TreatmentsService } from './treatments.service';

@Controller('treatments')
export class TreatmentsController {
  constructor(private treatmentsService: TreatmentsService) {}

  @Get()
  async showAll() {
    const treatments = await this.treatmentsService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: '',
      treatments,
    };
  }

  @Post()
  async createTreatment(@Body() data: TreatmentsDTO) {
    const treatment = await this.treatmentsService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Treatments created successfully',
      treatment,
    };
  }
}
