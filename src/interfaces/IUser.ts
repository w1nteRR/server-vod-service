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
    confirmPassword: string
}

export interface IUserSignIn {
    email: string,
    password: string
}