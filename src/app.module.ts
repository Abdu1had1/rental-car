import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './TypeOrm/entities/Customer.entity';
import { ReserveEntity } from './TypeOrm/entities/Reserve.entity';
import { ReturnEntity } from './TypeOrm/entities/Return.entity';
import { LocationEntity } from './TypeOrm/entities/Location.entity';
import { CarEntity } from './TypeOrm/entities/Car.entity';
import { CustomersModule } from './customers/customers.module';
import { ReservesModule } from './reserves/reserves.module';
import { ReturnsModule } from './returns/returns.module';
import { LocationsModule } from './locations/locations.module';
import { CarsModule } from './cars/cars.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { CustomersController } from './customers/controllers/customers/customers.controller';
import { ReservesController } from './reserves/reserves.controller';
import { LocationsController } from './locations/locations.controller';
import { CarsController } from './cars/cars.controller';
import { ReturnsController } from './returns/returns.controller';




@Module({
  imports: [
    JwtModule.register({ secret: jwtConstants.secret }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db-1.c5kce0s08gtm.eu-north-1.rds.amazonaws.com',
      port: 3306,
      username: 'user2',
      password: 'mysql1234',
      database: 'car_rental',
      entities: [CustomerEntity, ReserveEntity, ReturnEntity, LocationEntity, CarEntity],
      // synchronize: true,
    }),
    AuthModule,
    CustomersModule,
    LocationsModule,
    CarsModule,
    ReservesModule,
    ReturnsModule,
  ],
  controllers: [AppController,CustomersController,CarsController,LocationsController,ReservesController,ReturnsController],
  providers: [
    AppService,
    AuthGuard,
    // Remove APP_GUARD as it's not needed since AuthGuard is now provided as a regular provider
  ],
})
export class AppModule {}
