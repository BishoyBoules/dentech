import {User} from "./user";

export interface Item {
  id: string;
  item_name: string;
  price_per_unit: number;
  item_code: string;
  company_name: string;
  default_number_of_units: number;
  default_number_of_subunits: number;
  expiration_date: string;
  specialization?: string;
  exportingUser?: User;
  number_of_units?: number;
  subItems?: Item[];
  pricePerSubUnit?: number;
  available_subunits?: number;
  export_date?: string;
  exported_subunits?: number;
  release_date?: string
}

export interface Category {
  id: string;
  category_name: string;
  category_price_per_patient: number;
  lists: number[];
  extra_items: number[];
  operation_hour_rate: number;
  clinic: number;
}
