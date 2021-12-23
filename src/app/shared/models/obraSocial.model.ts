import { DataRoute } from "./basic/data.routes.model";
import { ArrayResponse } from "./basic/res.array.model";
import { CondicionFiscal } from "./condicionFiscal.model";
import { TipoObraSOcial } from './tipoObraSocial.model';
import { ConvenioGerenciadora } from './convenioGerenciadora.model';

export interface ObraSocial{
    //SUS PROPIEDADES ""
    //EDITE EL SIGUIENTE EJEMPLO CON SUS PROPIEDADES
    id:number,
    codigo:string,
    titulo:string,
    estado:boolean,
    created_at:Date,
    updated_at:Date,
    razon_social:string,
    cuit:string,
    condicion_fiscal_id:number,
    tipo_obra_social_id:number,
    convenio_gerenciadora_id:number,
    condicion_fiscal:CondicionFiscal,
    tipo_obra_social:TipoObraSOcial,
    convenio_gerenciadora:ConvenioGerenciadora,
    domicilio_completo:string,
    ciudad:string,
    codigo_postal:string,
    provincia:number,
    provincia_data:Provincia,
    dias_compromiso_de_pago:string,
}

export interface Provincia{
    nombre:string,
    id:number,
    titulo:string,
} 

export interface DataRouteObraSocial extends DataRoute{
    obraSocial: ObraSocial
    provincias: ArrayResponse<Provincia>
    condicionesFiscales: ArrayResponse<CondicionFiscal>
    tiposObrasSociales: ArrayResponse<TipoObraSOcial>
    gerenciadoras: ArrayResponse<ConvenioGerenciadora>
}