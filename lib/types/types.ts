export type UserType = {
    id: number,
    username: string,
    password: string,
    verified: number,
    email: string,
    refreshToken: string | null
}

export type AddTravelArgs = {
    files: Array<{desc: string | undefined | null, base64: string}>, 
    refreshToken: string | undefined,
    travel: {
        name: string | undefined | null,
        description: string | undefined | null,
        private: boolean
    }
}