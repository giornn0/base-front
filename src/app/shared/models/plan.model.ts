export interface Plan {
  id:number,
  obra_social_id: number;
  codigo: string;
  titulo: string;
  nombre: string;
  numero_tabla_asociada: number;
  estado: boolean;
  cond_iva: boolean,
  created_at:Date,
  updated_at: Date
}
