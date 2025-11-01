import apiClient from './apiClient';
import type { User, NewUserData } from '../types/User';

export interface UsersPaginatedResponse {
  data: User[];
  totalCount: number;
}

export const getAllUsers = async (
  curPage: number, 
  pageSize: number,
  sortKey: string,
  sortOrder: 'asc' | 'desc'
): Promise<UsersPaginatedResponse> => {
  
  const response = await apiClient.get<User[]>(
    `/users?_page=${curPage}&_limit=${pageSize}&_sort=${sortKey}&_order=${sortOrder}`
  );
  
  const totalCount = Number(response.headers['x-total-count'] || 0)

  return  {
    data: response.data,
    totalCount: totalCount
  }
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${id}`);
  return response.data;
};

export const createUser = async (userData: NewUserData): Promise<User> => {
  const response = await apiClient.post<User>('/users', userData);
  return response.data;
};

export const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
  const response = await apiClient.patch<User>(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await apiClient.delete(`/users/${id}`);
};