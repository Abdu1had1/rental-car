import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from 'src/TypeOrm/entities/Location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository : Repository<LocationEntity>,
  ){}

  async getAllLocations(){
    return this.locationRepository.find();
  }
  async createLocation(locationDetails: CreateLocationDto){
    const newLocation = this.locationRepository.create({
      ...locationDetails,
    });
    return this.locationRepository.save(newLocation);
  }
  async updateLocation(id: number, updateLocationDetails: UpdateLocationDto){
    const location = await this.locationRepository.findOneByOrFail({id});
    if(!location){
      throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(location, updateLocationDetails);

    return this.locationRepository.save(location);
  }

  async deleteLocation(id: number){
    const location = await this.locationRepository.findOneByOrFail({id});
    if(!location){
      throw new NotFoundException('Location not found');
    }

    return this.locationRepository.delete(id);
  }



}
