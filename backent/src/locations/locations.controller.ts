import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { LocationsDTO } from './locations.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  async showAll() {
    const locations = await this.locationsService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: '',
      locations,
    };
  }

  @Post()
  async create(@Body() data: LocationsDTO) {
    const location = await this.locationsService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Locations created successfully',
      location,
    };
  }
}
