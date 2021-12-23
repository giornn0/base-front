import { AsociacionRegional } from "./asociacionRegional.model";
import { DataRoute } from "./basic/data.routes.model";
import { CondicionISIB } from "./condicionISIB.model";
import { DirectorMedico } from "./directorMedico.model";
import { Provincia } from "./obraSocial.model";
import { RepresentanteLegal } from "./representanteLegal.model";
import { TipoCentro } from "./tipoCentro.model";
import {  MainListTemplate } from './basic/template.list.model';
import { Evento } from "./evento.model";
import { ArrayResponse } from "./basic/res.array.model";
import { User } from "./user.model";
import { Paciente } from "./paciente.model";

export interface CentroAtencion extends User{
  id:number,
  id_centro:string,
  nombre:string,
  nro_isib:number,
  cuit:number|string,
  condicion_isib_id:number,
  domicilio_completo:string,
  ciudad:string,
  codigo_postal:number,
  provincia:string,
  alic_ret_gcias:number,
  alic_ret_isib:number,
  alic_gtos_asoc:number,
  alic_gtos_cadra:number,
  estado:string,
  tipo_centro_id:number,
  asociacion_regional_id:number,
  director_medico_id:number,
  representante_legal_id:number,
  email:string,
  created_at:Date
  updated_at:Date,
  representante_legal?: RepresentanteLegal,
  director_medico?: DirectorMedico,
  condicion_isib?: CondicionISIB,
  tipo_centro?: TipoCentro,
  asociacion_regional?: AsociacionRegional
  provincia_data:Provincia
  owner?: User
}

export interface DataRouteCentroAtencion extends DataRoute{
  condiciones_isib?: ArrayResponse<CondicionISIB>
  asociaciones_regionales?: ArrayResponse<AsociacionRegional >
  tipos_centros?: ArrayResponse<TipoCentro>
  directores_medicos?: ArrayResponse<DirectorMedico>
  representantes_legales?: ArrayResponse<RepresentanteLegal>
  provincias?: ArrayResponse<Provincia>
  pacientes?: ArrayResponse<Paciente>
  centroAtencion?:CentroAtencion
  owner?:boolean
  eventos?:Evento[]
  templateEventos?:MainListTemplate
}
