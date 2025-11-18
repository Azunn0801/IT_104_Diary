import apiClient from './apiClient';
import type { Post, NewPostData } from '../types/Post';

export interface PostsPaginatedResponse {
  data: Post[];
  totalCount: number;
}

export const getAllPosts = async (
  page: number, 
  pageSize: number,
  categoryId: number | null | string,
  userId?: string,
  status?: string
): Promise<PostsPaginatedResponse> => {
  
  let url = `/posts?_expand=user&_expand=category`;
  
  if (categoryId) {
    url += `&categoryId=${categoryId}`;
  }

  if (userId) {
    url += `&userId=${userId}`;
  }

  if (status) {
    url += `&status=${status}`;
  }

  const response = await apiClient.get<Post[]>(url);
  const allPosts = response.data;

  allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const totalCount = allPosts.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = allPosts.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    totalCount: totalCount
  };
};

export const getPostById = async (id: string): Promise<Post> => {
  const response = await apiClient.get<Post>(
    `/posts/${id}?_expand=user&_expand=category&_embed=comments`
  );
  return response.data;
};

export const createPost = async (postData: NewPostData): Promise<Post> => {
  const response = await apiClient.post<Post>('/posts', postData);
  return response.data;
};

export const updatePost = async (id: string, postData: Partial<Post>): Promise<Post> => {
  const response = await apiClient.patch<Post>(`/posts/${id}`, postData);
  return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await apiClient.delete(`/posts/${id}`);
};