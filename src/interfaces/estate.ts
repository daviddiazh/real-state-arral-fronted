export interface IEstate {
    consecutivo: number | string;
    imagenes: Image[];
    clase: string;
    tipo_servicio: string;
    area: number | string;
    municipio: string;
    barrio: string;
    precio_venta: string;
    precio: string;
}

export interface Image {
    fotourl: string;
    alt: string;
}
