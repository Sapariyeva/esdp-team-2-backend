import { PostDto } from '../dto/post.dto';
import { IPost } from '../interfaces/IPost.interface';
import { PostRepository } from '../repositories/post.repository';

export class PostService {
  private repository: PostRepository = new PostRepository();

  createPost = async (dto: PostDto): Promise<IPost> => {
    return await this.repository.createPost(dto);
  };

  getOnePost = async (id: number): Promise<IPost | null> => {
    return await this.repository.getOnePost(id);
  };
}
