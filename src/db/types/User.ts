export interface IUser {
  id: string;
  user_id: string | null;
  email: string;
  username: string;
  password: string;
  fullname: string;
  birthdate: Date;
  avatar_url: string;
  created_at: Date;
  updated_at: Date;
}
