import type { User } from './User';

export interface Comment {
  id: string;
  content: string;
  date: string;
  userId: string;
  postId: string;
  parentId: string | null; 
  likes: number[];

  user?: User;
}

export type NewCommentData = Omit<Comment, 'id' | 'user'>;