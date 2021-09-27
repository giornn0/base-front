
export interface Cliente{
    cliente_id:number,
    tipo_documento:number,
    numero_documento:string, 
    nombre: string, 
    apellido: string, 
    fecha_nacimiento: Date | string,
    profesion: string,
    email: string,
    phone?: number,
    cellphone?: number,
    domicilio_dni: string,
    localidad: string,
    codigo_postal: number,
    picture: Blob,
    type_picture:string
}
