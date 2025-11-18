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
    `/users?_sort=${sortKey}&_order=${sortOrder}`
  );
  
  const allUsers = response.data;

  const totalCount = allUsers.length;
  const startIndex = (curPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = allUsers.slice(startIndex, endIndex);

  return  {
    data: paginatedData,
    totalCount: totalCount
  }
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${id}`);
  return response.data;
};

export const createUser = async (userData: NewUserData): Promise<User> => {
  const response = await apiClient.post<User>('/users', userData);
  return response.data;
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  const response = await apiClient.patch<User>(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await apiClient.delete(`/users/${id}`);
};