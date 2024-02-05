import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerEntity } from './Customer.entity';
import { LocationEntity } from './Location.entity';
import { CarEntity } from './Car.entity';

@Entity('reserves')
export class ReserveEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pickupDate: Date;

  @Column()
  returnDate: Date;

  @Column()
  phoneNo: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.reserves)
  customer: CustomerEntity;

  @ManyToOne(() => LocationEntity, (location) => location.reserves)
  location: LocationEntity;

  @ManyToOne(() => CarEntity, (car) => car.reserves)
  car: CarEntity;
}
