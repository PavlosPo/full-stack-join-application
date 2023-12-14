import { Post } from './post';

export interface User {
  id?:  number ;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  token: string;
  likedPosts?: Post[];
}