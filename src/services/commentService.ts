import apiClient from './apiClient';
import { Comment, NewCommentData } from '../types/Comment';

export const getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  const response = await apiClient.get<Comment[]>(
    `/comments?postId=${postId}&_expand=user`
  );
  return response.data;
};

export const createComment = async (commentData: NewCommentData): Promise<Comment> => {
  const response = await apiClient.post<Comment>('/comments', commentData);
  return response.data;
};

export const deleteComment = async (id: number): Promise<void> => {
  await apiClient.delete(`/comments/${id}`);
};

export const updateComment = async (id: number, commentData: Partial<Comment>): Promise<Comment> => {
  const response = await apiClient.patch<Comment>(`/comments/${id}`, commentData);
  return response.data;
};