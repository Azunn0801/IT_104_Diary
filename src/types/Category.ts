export interface Category {
    id: string
    name: string
}

export type NewCategoryData = Omit<Category, 'id'>;