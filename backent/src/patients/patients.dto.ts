export interface PatientsDTO {
  id: number;
  name: string;
  id_number: string;
  phone_number: string;
  is_active: boolean;
  treatmentId: number;
  locationId: number;
  date: string;
  time_start: string;
  time_end: string;
  create_date: Date;
  update_date: Date;
}
