import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LocationEntity } from "./Location.entity";
import { ReserveEntity } from "./Reserve.entity";

@Entity('cars')
export class CarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @OneToMany(()=>ReserveEntity, (reserve)=>reserve.car)
  reserves: ReserveEntity[];

  @ManyToMany(() => LocationEntity, (location) => location.car)
  @JoinTable({name: 'car_location'})
  location: LocationEntity[];

}