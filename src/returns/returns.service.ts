import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReturnEntity } from "src/TypeOrm/entities/Return.entity";
import { DeepPartial, Repository } from "typeorm";
import { CreateReturnDto } from "./dto/create-return.dto";
import { UpdateReturnDto } from "./dto/update-return.dto";
import { CustomerEntity } from "src/TypeOrm/entities/Customer.entity";
import { LocationEntity } from "src/TypeOrm/entities/Location.entity";

@Injectable()
export class ReturnsService {
  constructor(
    @InjectRepository(ReturnEntity)
    private returnRepository: Repository<ReturnEntity>,
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,
  ) {}

  async createReturn(createReturnDto: CreateReturnDto): Promise<ReturnEntity> {
    // Input validation
    if (!createReturnDto || !createReturnDto.customerId || !createReturnDto.locationId) {
      throw new Error('Invalid input. Please provide customerId and locationId.');
    }
  
    try {
      // Load related entities
      const customer = await this.customerRepository.findOne({
        where: { id: createReturnDto.customerId },
      });
  
      const location = await this.locationRepository.findOne({
        where: { id: createReturnDto.locationId },
      });
  
      // Create a new ReturnEntity without saving it to the database yet
      const newReturn = this.returnRepository.create({
        ...createReturnDto,
        customer,
        location,
      } as DeepPartial<ReturnEntity>);
  
      // Save the new return to the database
      return this.returnRepository.save(newReturn);
    } catch (error) {
      // Handle the error from findOneOrFail
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Customer or location not found: ${error.message}`);
      } else {
        throw new Error(`Error finding customer or location: ${error.message}`);
      }
    }
  }
  
  async getAllReturns(): Promise<ReturnEntity[]> {
    return this.returnRepository.find({ relations: ['customer', 'location'] });
  }

  async updateReturn(id: number, updateReturnDetails: UpdateReturnDto): Promise<ReturnEntity> {
    const returns = await this.returnRepository.findOne({ where: { id } });

    if (!returns) {
      throw new HttpException('Return not found', HttpStatus.NOT_FOUND);
    }

    Object.assign(returns, updateReturnDetails);

    return this.returnRepository.save(returns);
  }

  async deleteReturn(id: number): Promise<void> {
    await this.returnRepository.delete(id);
  }
}
