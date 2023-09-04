import { IvalidacionInput } from "src/app/models/validacion";

export const MENSAJES_VALIDACION: IvalidacionInput = {
    name: [
        { tipo: "required", mensaje: "Name is required" },
    ],
    job: [
        { tipo: "required", mensaje: "Job is required" },
    ],
}