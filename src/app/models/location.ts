import { Category } from "./category";

export interface Location {
  _id: string,
  user_id: string,
  name: string,
  desc: string,
  address: string,
  latitude: number,
  longitude: number,
  status: boolean,
  rating: number,
  categories: Category[],
  img_name: string[]
}
