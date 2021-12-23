import { CentroAtencion } from './centroAtencion.model';
import { EfectorDerivante } from './efectorDerivante.model';
import { Genero } from './generos.model';
import { ObraSocial } from './obraSocial.model';
import { EstadoCivil } from './estadoCivil.model';
import { DataRoute } from './basic/data.routes.model';
import { ArrayResponse } from './basic/res.array.model';
export interface Paciente{
    id:number
    nombre_completo:string
    domicilio_completo:string
    localidad:string
    estado:boolean
    numero_afiliado:string
    fecha_nacimiento:Date
    fecha_primera_dialisis:Date
    dni:number
    cuit:number|string
    centro_atencion_id:number
    efector_derivante_id:number
    obra_social_id:number
    estado_civil_id:number
    centro_atencion:CentroAtencion
    efector_derivante:EfectorDerivante
    obra_social:ObraSocial
    estado_civil:EstadoCivil
    genero:Genero
    genero_id:number
    nacionalidad:string
    telefono_fijo:string
    telefono_celular:string
    sexo:number
    grupo_sanguineo:string
    factor_sanguineo:string
    email:string
    created_at:Date
    updated_at:Date
}

export interface DataRoutePaciente extends DataRoute{
    paciente: Paciente,
    centroAtencion:ArrayResponse<CentroAtencion>
    efectoresDerivantes:ArrayResponse<EfectorDerivante>
    obrasSociales:ArrayResponse<ObraSocial>
    estadosCiviles:ArrayResponse<EstadoCivil>
    generos:ArrayResponse<Genero>
}