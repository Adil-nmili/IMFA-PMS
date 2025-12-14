import type { Key } from "react";

export interface UserType {
  [x: string]: Key | null | undefined;
  code_pin?: number;
  rfid?: number;
  nomEmp: string;
  dateNaissanceEmp?: string;
  adresseEmp?: string;
  mobileEmp?: string;
  emailEmp?: string;
  image: string;
  role_id?: number;
  role: string; // Computed from roles.name
  roles?: {
    id: number;
    name: string;
  };
}