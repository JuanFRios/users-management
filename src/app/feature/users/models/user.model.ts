// Tipos de datos de la API

// Respuesta de la API para lista de usuarios
export interface IuserResponse {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}

export interface IlistUsersResponse {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: IuserResponse[]
}

// Request y Respuesta de la API para crear un usuario
export interface IcreateUserRequest {
    name: string
    job: string
}

export interface IcreateUserResponse {
    name: string
    job: string
    id: string
    createdAt: string
  }
