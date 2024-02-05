import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomerEntity } from "./Customer.entity";
import { LocationEntity } from "./Location.entity";

@Entity('returns')
export class ReturnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  returnDate: Date;

  @Column()
  time: string;

  @Column()
  odometer: number;

  @Column()
  fullTank: boolean;

  @Column()
  phoneNo: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.returns)
  customer: CustomerEntity;

  @ManyToOne(() => LocationEntity, (location) => location.returns)
  location: LocationEntity;

}