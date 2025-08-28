export interface INote {
  id: string;
  user_id: string;
  message: string;
  auditory: 'friends' | 'subscribed';
  created_at: Date;
  updated_at: Date;
}
