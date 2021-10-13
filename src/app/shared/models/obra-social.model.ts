import { Plan } from "./plan.model";

export interface ObraSocial {
  id: number;
  codigo: number;
  titulo: string;
  nombre: string,
  estado: boolean;
  planes?: Plan[],
  created_at: Date,
  updated_at: Date
}
