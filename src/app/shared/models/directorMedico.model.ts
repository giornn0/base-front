import { DataRoute } from './basic/data.routes.model';
import { CentroAtencion } from './centroAtencion.model';
export interface DirectorMedico{
    //SUS PROPIEDADES ""
    //EDITE EL SIGUIENTE EJEMPLO CON SUS PROPIEDADES
    id:number
    dni:number
    nombre_completo:string
    domicilio_completo:string
    telefono_fijo:string
    telefono_celular:string
    matricula:string
    email:string
    nro_registro_incucai:number
    centro:CentroAtencion
    created_at:Date
    updated_at:Date
    centro_atencion_id?:number
}

export interface DataRouteDirectorMedico extends DataRoute{
    directorMedico: DirectorMedico
  }