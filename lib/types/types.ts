export type UserType = {
    id: number,
    username: string,
    password: string,
    verified: number,
    email: string,
    refreshToken: string | null
}