import { Module } from '@nestjs/common';
import { CustomersService } from './services/customers/customers.service';
import { CustomersController } from './controllers/customers/customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/TypeOrm/entities/Customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  providers: [CustomersService],
  controllers: [CustomersController],
  exports: [CustomersService]
})
export class CustomersModule {}
