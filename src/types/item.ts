import {User} from "./user";

export enum Specialization {
  DIAGNOSIS = 'diagnosis',
  SCALING = 'scaling'
}

export interface Item {
  id: string;
  code?: string;
  name: string;
  price: number;
  specialization: Specialization;
  additionDate?: Date;
  exportingDate?: Date;
  exportingUser?: User;
  releaseDate?: Date;
  expirationDate?: Date;
  companyName?: string;
  defaultNumOfUnits?: number;
  defaultNumOfSubUnits?: number;
  pricePerUnit?: number;
  pricePerSubUnit?: number;
  totalNumOfSubUnits?: number;
  subItems?: Item[];
}

// export interface CreateItemDto {
//   name: string;
//   price: number;
//   description?: string;
//   companyName: string;
//   defaultNumOfUnits: number;
// }

// export interface UpdateItemDto {
//   name?: string;
//   price?: number;
//   description?: string;
//   companyName?: string;
//   defaultNumOfUnits?: number;
// }
