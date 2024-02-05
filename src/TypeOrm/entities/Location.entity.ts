import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReserveEntity } from "./Reserve.entity";
import { ReturnEntity } from "./Return.entity";
import { CarEntity } from "./Car.entity";

@Entity('locations')
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @OneToMany(() => ReserveEntity, (reserve) => reserve.location)
  reserves: ReserveEntity[];

  @OneToMany(() => ReturnEntity, (returnItem) => returnItem.location)
  returns: ReturnEntity[];


  @ManyToMany(()=> CarEntity, (car) => car.location)
  @JoinTable({ name: 'car_location'})
  car: CarEntity[];

}