import { News } from '../../models/news.models';

export interface CustomizedUser {
  uid: string;
  email: string | undefined;
  name: string | undefined;
  favoriteItems: News[];
}
