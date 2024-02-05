import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from 'src/TypeOrm/entities/Car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarEntity)
    private carRepository : Repository<CarEntity>,
  ) {}

  async getAllCars(){
    return this.carRepository.find();
  }

  async createCar(carDetails: CreateCarDto){
    const newCar = this.carRepository.create({
      ...carDetails,
    });
    return this.carRepository.save(newCar);
  }

  async updateCar(id: number, updateCarDetails: UpdateCarDto){
    const car = await this.carRepository.findOneByOrFail({id});
    if(!car){
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(car, updateCarDetails);

    return this.carRepository.save(car);
  }

  async deleteCar(id: number){
    return this.carRepository.delete(id)
  }

}
