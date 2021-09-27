import { SafeUrl } from "@angular/platform-browser";

export interface Pago {
  pago_id:number,
  contrato_id: number;
  medio_pago: number;
  monto: number;
  fecha_pago: Date;
  comprobante: Blob | SafeUrl;
  aceptado?: boolean;
  type_comprobante:string
}
