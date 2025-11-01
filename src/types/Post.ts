import { User } from './User';
import { Category } from './Category';
import { Comment } from './Comment';

export interface Post {
  id: number;
  title: string;
  content: string;
  pictureUrl: string;
  date: string; 
  userId: number;
  categoryId: number;
  likes: number[];

  user?: User;
  category?: Category;
  
  comments?: Comment[];
}

export type NewPostData = Omit<Post, 'id' | 'user' | 'category' | 'comments'>;