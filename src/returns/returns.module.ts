import { Module } from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { ReturnsController } from './returns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReturnEntity } from 'src/TypeOrm/entities/Return.entity';
import { CustomerEntity } from 'src/TypeOrm/entities/Customer.entity';
import { LocationEntity } from 'src/TypeOrm/entities/Location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReturnEntity, CustomerEntity, LocationEntity])],
  controllers: [ReturnsController],
  providers: [ReturnsService],
  exports: [ReturnsService]
})
export class ReturnsModule {}
