import { Arancel } from "./arancel.model";

export interface Prestacion {
    diente: string,
    cara:string,
    codigo:number,
    prestacion: string,
    descripcion:string,
    arancel: Arancel
}