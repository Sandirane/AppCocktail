export interface IUser {
    id?: number,
    nom: string,
    prenom: string,
    pseudo: string,
    email: string,
    password: string,
    updatedAt?: string,
    createdAt?: string,
    deletedAt?: null | string
}

export interface ISingleUser {
    data: IUser
}
export interface IDataUser {
    data: IUser[]
}
export interface ITokenUser{
    id: number,
    nom: string,
    prenom: string,
    email: string,
    iap?: number,
    exp?: number
}