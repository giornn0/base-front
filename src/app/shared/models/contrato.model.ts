import { Pago } from "./pago.model";

export interface Contrato {
  contrato_id: number,
  numero_contrato: string,
  cliente_id: number,
  vendedor_id: number,
  fecha_contrato: Date,
  tipo_contrato: string,
  observaciones: string,
  files?: Blob
  pagos?: Pago[]
  valor_mt2: number| string,
  financiacion: string,
  tipo_construccion:string,
  tipologia:string,
  dormitorios:number,
  mt2_cubiertos:number,
  mt2_semicubiertos:number,
  terminacion:string,
  mt2_totales: number,
  type_files:string
}
