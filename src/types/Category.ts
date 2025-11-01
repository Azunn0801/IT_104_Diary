export interface Category {
    id: number
    name: string
}

export type NewCategoryData = Omit<Category, 'id'>;