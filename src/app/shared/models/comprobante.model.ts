import { CentroAtencion } from "./centroAtencion.model";
import { Paciente } from "./paciente.model";
import { Servicio } from "./servicio.model";
import { User } from "./user.model";

export interface Comprobante{
    //SUS PROPIEDADES ""
    //EDITE EL SIGUIENTE EJEMPLO CON SUS PROPIEDADES
    id:number     //Obligatorio
    servicio_id:number
    servicios: Servicio
    estado_comprobante: EstadoComprobante
    estado_id:number
    comprobantes_mensajes: ComprobanteMensaje[]
    fecha_inicio_periodo_facturado:Date
    fecha_fin_periodo_facturado:Date
    pacientes: Paciente[]
    fecha_emision_comprobante:Date
    campos_a_revisar:string
    centro_atencion_id:number
    centro_atencion:CentroAtencion
    PDV:number
    nro_comprobante:number
    letra_tipo_comprobante:string
    tipo_comprobante:string
    importe_final:number
    descripcion:string
    cant_pacientes_facturados:number
    created_at:Date     //Mayoria tendra
    updated_at:Date     //Mayoria tendra
}
export interface EstadoComprobante{
    id:number
    titulo: string
    estado:number
    created_at:Date     //Mayoria tendra
    updated_at:Date     //Mayoria tendra
}
export interface ComprobanteMensaje{
    id:number
    comprobante_id:number
    mensaje:string
    created_by:number | string,
    creador:User
    estado:string
    updated_at:Date     //Mayoria tendra
    created_at:Date     //Mayoria tendra
}