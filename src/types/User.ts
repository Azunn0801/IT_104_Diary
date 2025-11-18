export interface User {
    id: string
    fullName: string
    username: string
    email: string
    avatarUrl: string
    isActive: boolean
    password: string
    role: boolean
}

export type NewUserData = Omit<User, 'id'>;