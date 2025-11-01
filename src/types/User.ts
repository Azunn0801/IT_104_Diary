export interface User {
    id: number
    fullName: string
    username: string
    email: string
    avatarUrl: string
    isActive: boolean
    role: boolean
}

export type NewUserData = Omit<User, 'id'>;