import { CentroAtencion } from "./centroAtencion.model";
import { Paciente } from "./paciente.model";
import { User } from "./user.model";

export interface Evento{
    id:number,
    paciente_id: number,
    fecha:Date,
    created_at:Date,
    updated_at:Date,
    created_by:number,
    updated_by:number,
    evento_model:string,
    estado:string,
    data:JSON,
    creado_por:User
    actualizado_por:User
    paciente:Paciente
    centro_atencion:CentroAtencion
}