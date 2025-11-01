import type { User } from './User';

export interface Comment {
  id: number;
  content: string;
  date: string;
  userId: number;
  postId: number;
  parentId: number | null; 
  likes: number[];

  user?: User;
}

export type NewCommentData = Omit<Comment, 'id' | 'user'>;