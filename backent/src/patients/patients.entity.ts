import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { TreatmentsEntity } from '../treatments/treatments.entity';
import { LocationsEntity } from '../locations/locations.entity';
@Entity('patients')
export class PatientsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', unique: true })
  id_number?: string;

  @Column()
  phone_number: string;

  @Column({ default: false })
  is_active: boolean;

  @Column()
  treatmentId: number;

  @OneToOne((type) => TreatmentsEntity, (treatment) => treatment.id)
  @JoinColumn()
  treatment: TreatmentsEntity;

  @Column()
  locationId: number;

  @OneToOne((type) => LocationsEntity, (location) => location.id)
  @JoinColumn()
  location: LocationsEntity;

  @Column()
  date: string;

  @Column()
  time_start: string;

  @Column()
  time_end: string;

  @Column({ default: new Date() })
  create_date: Date;

  @Column({ default: new Date() })
  update_date: Date;
}
