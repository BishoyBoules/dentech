import {User} from "./user";

export enum Specialization {
  SPECIALIZATION = 'specialization',
  DIAGNOSIS = 'diagnosis',
  SCALING = 'scaling',
}

export interface Item {
  id: string;
  item_name: string;
  price_per_unit: number;
  item_code: string;
  company_name: string;
  default_number_of_units: number;
  default_number_of_subunits: number;
  expiration_date: string;
  specialization?: Specialization;
  exportingUser?: User;
  number_of_units?: number;
}
