import type { IUser } from '@/db/types/User';
import { hashPassword } from '../utils/auth';
import { BaseEntity } from '../utils/BaseEntity';

export class User extends BaseEntity implements IUser {
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

  constructor(data: IUser) {
    super();
    this.id = data.id;
    this.user_id = data.user_id;
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.fullname = data.fullname;
    this.birthdate = data.birthdate;
    this.avatar_url = data.avatar_url;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  async hashPassword() {
    this.password = await hashPassword(this.password);
  }
}
