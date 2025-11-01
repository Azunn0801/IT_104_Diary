import type { User } from "../types/User";

const AUTH_KEY = 'loggedInUser'

export const getAuth = (): User | null => {
    const user = localStorage.getItem(AUTH_KEY)
    if(user) {
        try {
            return JSON.parse(user) as User
        }
        catch (err) {
            console.error("Failed to parse user", err)
            return null
        }
    }
    return null
}

export const logout = (): void => {
    localStorage.removeItem(AUTH_KEY)
}