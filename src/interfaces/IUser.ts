export interface IUser {
    email: string,
    password: string,
    username: string,
    role: string
}

export interface IUserSignUp {
    email: string,
    username: string,
    password: string,
    confirm_password: string
}