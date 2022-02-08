import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('treatments')
export class TreatmentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  create_date: Date;

  @Column()
  update_date: Date;
}
