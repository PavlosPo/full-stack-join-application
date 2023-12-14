import { User } from './user';

export interface Post { 
  id? : number;
  content: string;
  usersWhoLikedThisPost?: User[];
  userCreated: User;
  createdDate?: Date;
  updateDate?: Date;
}