export interface Comment {
  _id: string,
  user_id: string,
  location_id: string,
  message: string,
  rating: number,
  liked: number,
  created_at: Date,
  status: boolean
}
