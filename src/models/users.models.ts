import { News } from './news.models';
export interface Users {
  name: string | null;
  email: string;
  uid: string;
  favoritenewsItems: News[];
}
