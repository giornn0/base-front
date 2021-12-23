export interface ListTemplate{
    title?:string,
    nombreForDelete:string,
    status?:string,
    personalDelete?:boolean,
    estado?:string,
    classEstado?:string,
    specificShow?:boolean,
    specificStatus?:EspecificStatus
    notifications?:number,
    classEstadoChanging?:boolean
    personalEdit?:boolean,
    subscribable?:SubscriptionStatus
    headIcon?:string,
    header:string,
    id:number,
    properties?:PropertyListTemplate[],
}
export interface TableProperty{
    data:string,
    font:string
}
export interface Relation{
    title:string,
    section:string,
    routeURL:string,
    routeForReroute:string
    id:number,
    tableHeaders: string[],
    tableProperties: TableProperty[],
    unique?
}
export interface MainListTemplate{
    headIcon:string,
    relations?: Relation[],
}


export interface PropertyListTemplate{
    title?:string,
    icon?:string,
    date?:boolean,
    special?:boolean
    values:Array<PropertyValue>
    actions?:PropertyAction
}

export interface PropertyValue{
    special?:boolean
    icon?: string,
    font: string,
    label: string,
    data: string|number|Date,
}
export interface PropertyAction{
    edit:boolean,
    show:boolean,
    section:string,
    routeURL:string,
    routeForReroute?:string
    id:number,
    plusIcon:string,
    plusTooltip:string,
}
interface EspecificStatus{
    class:string
    label:string
}
export interface SubscriptionStatus{
    status:boolean
}