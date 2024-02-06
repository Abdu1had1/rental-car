import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiProperty, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@Controller('locations')
@ApiTags("Locations")
@ApiSecurity("JWT-auth")
@UseGuards(AuthGuard)
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Location object as response',
    type: CreateLocationDto
  })
  @ApiBadRequestResponse({ description: 'Location was not created. Try Again!' })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.createLocation(createLocationDto);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'List of Locations',
    type: CreateLocationDto
    })
  findAll() {
    return this.locationsService.getAllLocations();
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'Updated Location object as response',

  })
  @ApiBadRequestResponse({ description: 'Location not found or update failed' })
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.updateLocation(+id, updateLocationDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Deleted Location object as response',
  })
  @ApiBadRequestResponse({ description: 'Location not found or delete failed'})
  remove(@Param('id') id: string) {
    return this.locationsService.deleteLocation(+id);
  }
}



