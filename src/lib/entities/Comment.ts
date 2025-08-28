import type { IComment } from '@/db/types/Comment';
import { BaseEntity } from '../utils/BaseEntity';

export class Comment extends BaseEntity implements IComment {
  id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  publication_id: string;
  message: string;

  constructor(data: IComment) {
    super();
    this.id = data.id;
    this.user_id = data.user_id;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.publication_id = data.publication_id;
    this.message = data.message;
  }
}
