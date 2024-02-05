import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiProperty, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@ApiBearerAuth()
@Controller('cars')
@ApiTags("Cars")
@ApiSecurity("JWT-auth")

export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Car object as response',
    type: CreateCarDto
  })
  @ApiBadRequestResponse({ description: 'Car was not created. Try Again!' })
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.createCar(createCarDto);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'List of Cars',
    type: CreateCarDto
  })
  @ApiBadRequestResponse({ description: 'Error retrieving cars' })
  getCars() {
    return this.carsService.getAllCars();
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'Updated Car object as response',
    type: UpdateCarDto
  })
  @ApiBadRequestResponse({ description: 'Car not found or update failed' })
  async updateCarById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCarDto: UpdateCarDto,
  ){
    await this.carsService.updateCar(id, updateCarDto);
    return { message: 'Car updated successfully', success: true };
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Deleted Car object as response'
  })
  @ApiBadRequestResponse({ description: 'Car not found or delete failed'})
  async deleteCarById(@Param('id', ParseIntPipe) id: number) {
    await this.carsService.deleteCar(id);
    return { message: 'Car deleted successfully', success: true };
  }
}
