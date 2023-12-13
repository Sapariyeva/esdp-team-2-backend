import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { appDataSource } from '../config/dataSource';
import { PostDto } from '../dto/post.dto';
import { IPost } from '../interfaces/IPost.interface';

export class PostRepository extends Repository<Post> {
  constructor() {
    super(Post, appDataSource.createEntityManager());
  }

  async createPost(dto: PostDto): Promise<IPost> {
    const post = this.create(dto);
    return await this.save(post);
  }
}
