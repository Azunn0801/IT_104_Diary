import type { User } from './User';
import type { Category } from './Category';
import type { Comment } from './Comment';

export interface Post {
  id: string;
  title: string;
  content: string;
  pictureUrl: string;
  date: string;
  userId: string;
  categoryId: string;
  likes: number[];
  status: "Public" | "Private";

  user?: User;
  category?: Category;
  
  comments?: Comment[];
}

export type NewPostData = Omit<Post, 'id' | 'user' | 'category' | 'comments'>;