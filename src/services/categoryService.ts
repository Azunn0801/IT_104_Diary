import apiClient from './apiClient';
import { Category } from '../types/data';

// GET: Lấy tất cả categories
export const getAllCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>('/categories');
  return response.data;
};

// (Dũng có thể thêm create, update, delete nếu cần)