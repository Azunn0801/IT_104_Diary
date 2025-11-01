import apiClient from './apiClient';
import { Post, NewPostData } from '../types/Post';

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>('/posts?_expand=user&_expand=category');
  return response.data;
};

export const getPostById = async (id: number): Promise<Post> => {
  const response = await apiClient.get<Post>(
    `/posts/${id}?_expand=user&_expand=category&_embed=comments`
  );
  return response.data;
};

export const createPost = async (postData: NewPostData): Promise<Post> => {
  const response = await apiClient.post<Post>('/posts', postData);
  return response.data;
};

export const updatePost = async (id: number, postData: Partial<Post>): Promise<Post> => {
  const response = await apiClient.patch<Post>(`/posts/${id}`, postData);
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await apiClient.delete(`/posts/${id}`);
};