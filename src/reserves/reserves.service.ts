import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReserveEntity } from 'src/TypeOrm/entities/Reserve.entity';
import { CarEntity } from 'src/TypeOrm/entities/Car.entity';
import { LocationEntity } from 'src/TypeOrm/entities/Location.entity';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { CustomerEntity } from 'src/TypeOrm/entities/Customer.entity';

@Injectable()
export class ReservesService {
  constructor(
    @InjectRepository(ReserveEntity)
    private reserveRepository: Repository<ReserveEntity>,
    @InjectRepository(CarEntity)
    private carRepository: Repository<CarEntity>,
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  async createReserve(createReserveDto: CreateReserveDto): Promise<ReserveEntity> {
    const { carId, locationId, customerId, ...rest } = createReserveDto;
  
    const car = await this.carRepository.findOne({ where: { id: carId } });
    const location = await this.locationRepository.findOne({ where: { id: locationId } });
    const customer = await this.customerRepository.findOne({ where: { id: customerId } });
  
    if (!car || !location || !customer) {
      throw new HttpException('Car, Location, or Customer not found', HttpStatus.NOT_FOUND);
    }
  
    const reserve = this.reserveRepository.create({
      ...rest,
      car,
      location,
      customer, // Include the customer in the created reserve
    });
  
    // Save the reservation first
    const savedReserve = await this.reserveRepository.save(reserve);

    // Update the many-to-many relationship between CarEntity and LocationEntity
    await this.carRepository.createQueryBuilder()
      .relation(CarEntity, 'location') // 
      .of(car)
      .add(location);

    return savedReserve;
  }
  

  async getAllReserves(): Promise<ReserveEntity[]> {
    return this.reserveRepository.find({ relations: ['customer', 'car', 'location'] });
  }

  async updateReserve(id: number, updateReserveDetails: UpdateReserveDto): Promise<ReserveEntity> {
    const reserve = await this.reserveRepository.findOne({ where: { id } });

    if (!reserve) {
      throw new HttpException('Reserve not found', HttpStatus.NOT_FOUND);
    }

    Object.assign(reserve, updateReserveDetails);

    return this.reserveRepository.save(reserve);
  }

  async deleteReserve(id: number): Promise<void> {
    await this.reserveRepository.delete(id);
  }
}
