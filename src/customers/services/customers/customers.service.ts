import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from 'src/TypeOrm/entities/Customer.entity';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { UpdateCustomerDto } from 'src/customers/dtos/UpdateCustomer.dto';
import * as bcrypt from 'bcryptjs';

export type Customer = any;

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  async getAllCustomers() {
    return this.customerRepository.find({ relations: ['reserves', 'returns'] });
  }

  async createCustomer(customerDetails: CreateCustomerDto) {
    const { email, password, ...rest } = customerDetails;

    // Check if the email is already registered
    const existingCustomer = await this.customerRepository.findOne({ where: { email } });
    if (existingCustomer) {
      throw new HttpException('Email is already registered', HttpStatus.BAD_REQUEST);
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = this.customerRepository.create({
      email,
      password: hashedPassword,
      ...rest,
    });
    return this.customerRepository.save(newCustomer);
  }

  async updateCustomer(id: number, updateCustomerDetails: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOneByOrFail({id});
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    // Update only the provided properties from updateCustomerDetails
    Object.assign(customer, updateCustomerDetails);

    return this.customerRepository.save(customer);
  }

  async deleteCustomer(id: number) {
    const customer = await this.customerRepository.findOneByOrFail({id});
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return this.customerRepository.delete(id);
  }

  async login(email: string, password: string): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOne({ where: { email } });

    if (!customer) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, customer.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return customer;
  }
  async findOne(name: string) {
    return this.customerRepository.findOne({where: {name}});
  }
}

