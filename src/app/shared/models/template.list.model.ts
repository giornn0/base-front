export interface Property{
    icon:string,
    font: string,
    label:string,
    data
}

export interface TableProperty{
    data:string,
    font:string
}

export interface Relation{
    title:string,
    section:string,
    id:number,
    tableHeaders: string[],
    tableProperties: TableProperty[]
}

export interface ListTemplate{
    headIcon:string,
    header:string,
    id:number,
    properties: Property[],
    relations: Relation[],
}