import { Prestacion } from "./prestacion.model";

export interface Autorizacion{
    d02presu:number,
    nro_afiliado:number,
    cond_iva:string, 
    apellido: string, 
    nombre: string, 
    tipo_documento:string,
    nro_documento: number,
    fecha_nacimiento: Date | string,
    obra_social_id: number,
    plan: number,
    fecha?: Date,
    prestaciones: Prestacion[]
}