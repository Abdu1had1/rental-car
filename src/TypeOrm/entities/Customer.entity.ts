// customer.entity.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReturnEntity } from './Return.entity';
import { ReserveEntity } from './Reserve.entity';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ unique: true }) // Ensure uniqueness for each email
  email: string;

  @Column()
  password: string;

  @OneToMany(() => ReserveEntity, (reserve) => reserve.customer)
  reserves: ReserveEntity[];

  @OneToMany(() => ReturnEntity, (returnItem) => returnItem.customer)
  returns: ReturnEntity[];
}
