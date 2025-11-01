import apiClient from './apiClient';
import type { Post, NewPostData } from '../types/Post';

export interface PostsPaginatedResponse {
  data: Post[];
  totalCount: number;
}

export const getAllPosts = async (
  page: number, 
  pageSize: number,
  categoryId: number | null
): Promise<PostsPaginatedResponse> => {
  
  let url = `/posts?_page=${page}&_limit=${pageSize}&_expand=user&_expand=category&_sort=date&_order=desc`;
  
  if (categoryId) {
    url += `&categoryId=${categoryId}`;
  }

  const response = await apiClient.get<Post[]>(url);
  const totalCount = Number(response.headers['x-total-count'] || 0);

  return {
    data: response.data,
    totalCount: totalCount
  };
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