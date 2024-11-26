import { News } from './news.models';
export interface Users {
  name: string | null;
  email: string | undefined;
  uid: string;
  favoriteItems: string[];
}
