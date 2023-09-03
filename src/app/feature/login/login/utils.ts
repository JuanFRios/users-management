export const MENSAJES_VALIDACION = {
    email: [
        { tipo: "required", mensaje: "Email is required" },
        { tipo: "email", mensaje: "Email is invalid" },
    ],
    password: [
        { tipo: "minlength", mensaje: "The minimum of characters will be 8" },
        { tipo: "required", mensaje: "Password is required" },
    ],
}