export interface IComment {
  id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  publication_id: string;
  message: string;
}
