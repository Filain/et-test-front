export interface IUser {
    email: string
    where_hear: EWhereHere
    date_birth: Date
    event_id: number
    name: string
}

export interface IUserList {
    data: IUser[]
    meta: {
        page: number
        total: number
    }
}

export enum EWhereHere {
    social_media = 'social_media',
    friends = 'friends',
    found_myself = 'found_myself',
}

export interface IFormValues  {
    email: string
    where_hear: EWhereHere
    date_birth: string
    event_id: number
    name: string
}