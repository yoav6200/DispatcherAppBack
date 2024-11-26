import { News } from './news.models';
export interface Users {
  name: String | null;
  email: String;
  uid: String;
  FavoritenewsItems: News[];
}
