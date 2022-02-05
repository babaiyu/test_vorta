import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('locations')
export class LocationsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  create_date: Date;

  @Column()
  update_date: Date;
}
