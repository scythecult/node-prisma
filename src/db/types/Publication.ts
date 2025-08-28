export interface IPublication {
  id: string;
  user_id: string;
  picture_url: string;
  likes: number;
  is_liked: boolean;
  description: string;
  created_at: Date;
  updated_at: Date;
}
