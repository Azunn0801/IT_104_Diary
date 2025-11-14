import apiClient from './apiClient';
import type { User, NewUserData } from '../types/User';

export const registerUser = async (userData: NewUserData): Promise<User> => {
  const checkEmail = await apiClient.get<User[]>(`/users?email=${userData.email}`);
  
  if (checkEmail.data.length > 0) {
    throw new Error('Email already exists.');
  }

  const response = await apiClient.post<User>('/users', userData);
  return response.data;
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  const response = await apiClient.get<User[]>(`/users?email=${email}`);

  if (response.data.length === 0) {
    throw new Error('Invalid email or password.');
  }

  const user = response.data[0];

  if (user.password !== password) {
    throw new Error('Invalid email or password.');
  }

  if (user.isActive === false) {
    throw new Error('Your account is locked.');
  }

  return user; 
};