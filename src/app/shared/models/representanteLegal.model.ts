import { DataRoute } from './basic/data.routes.model';
import { CentroAtencion } from './centroAtencion.model';
export interface RepresentanteLegal{
    //SUS PROPIEDADES ""
    //EDITE EL SIGUIENTE EJEMPLO CON SUS PROPIEDADES
    id:number
    nombre_completo:string
    domicilio_completo:string
    telefono_fijo:string
    telefono_celular:string
    dni:number
    email:string
    centro:CentroAtencion
    cargo:string
    created_at:Date
    updated_at:Date
}
export interface DataRouteRepresentanteLegal extends DataRoute{
    representante: RepresentanteLegal
}