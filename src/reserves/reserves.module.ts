import { Module } from '@nestjs/common';
import { ReservesService } from './reserves.service';
import { ReservesController } from './reserves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReserveEntity } from 'src/TypeOrm/entities/Reserve.entity';
import { CarEntity } from 'src/TypeOrm/entities/Car.entity';
import { LocationEntity } from 'src/TypeOrm/entities/Location.entity';
import { CustomerEntity } from 'src/TypeOrm/entities/Customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReserveEntity, CarEntity, LocationEntity, CustomerEntity])],
  controllers: [ReservesController],
  providers: [ReservesService],
  exports: [ReservesService]
})
export class ReservesModule {}
