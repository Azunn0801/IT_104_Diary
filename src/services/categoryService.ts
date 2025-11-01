import apiClient from './apiClient';
import type { Category, NewCategoryData } from '../types/Category';

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>('/categories');
  return response.data;
};

export const createCategory = async (categoryData: NewCategoryData): Promise<Category> => {
  const response = await apiClient.post<Category>('/categories', categoryData);
  return response.data;
};

export const updateCategory = async (id: number, categoryData: Partial<NewCategoryData>): Promise<Category> => {
  const response = await apiClient.patch<Category>(`/categories/${id}`, categoryData);
  return response.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await apiClient.delete(`/categories/${id}`);
};