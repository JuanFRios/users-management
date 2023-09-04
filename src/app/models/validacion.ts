export interface Ivalidacion  { 
    tipo: string,
    mensaje: string 
}

export type IvalidacionInput = Record<string, Ivalidacion[]> 
