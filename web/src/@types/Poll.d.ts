interface DatabaseEntity {
  id: number;
  guid?: string;
  createDt: string;
  updateDt: string;
}

interface UserEntity extends DatabaseEntity {
  name: string;
  nickName: string;
  email: string;
}

interface PollEntity extends DatabaseEntity {
  image: string;
  content: string;
  categories: CategoryEntity[];
  author: UserEntity;
  slug: string;
  options: PollOptionEntity[];
  comments?: PollCommentEntity[];
}

interface PollOptionEntity extends DatabaseEntity {
  content: string;
}

interface CategoryEntity extends DatabaseEntity {
  name: string;
  slug: string;
}

interface PollCommentEntity extends DatabaseEntity {
  content: string;
  author: UserEntity;
  replies?: PollCommentEntity[];
}
