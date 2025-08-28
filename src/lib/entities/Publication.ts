import type { IPublication } from '@/db/types/Publication';
import { BaseEntity } from '../utils/BaseEntity';

export class Publication extends BaseEntity implements IPublication {
  id: string;
  user_id: string;
  picture_url: string;
  likes: number;
  is_liked: boolean;
  description: string;
  created_at: Date;
  updated_at: Date;

  constructor(data: IPublication) {
    super();
    this.id = data.id;
    this.user_id = data.user_id;
    this.picture_url = data.picture_url;
    this.likes = data.likes;
    this.is_liked = data.is_liked;
    this.description = data.description;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  updateLikeCount() {
    this.likes = !this.is_liked ? this.likes + 1 : this.likes - 1;
    this.is_liked = !this.is_liked;
  }
}
