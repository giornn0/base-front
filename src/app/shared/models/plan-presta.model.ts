import { Arancel } from "./arancel.model";

export interface PlanPresta{
    a04nro: number,
    a04descri: string,
    a22nro: number,
    a04valor:string,
    append:{},
    arancel: Arancel
}