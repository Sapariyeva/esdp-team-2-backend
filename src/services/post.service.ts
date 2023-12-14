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

  getAllPost = async (): Promise<IPost[]> => {
    return await this.repository.getAllPost();
  };

  editPost = async (dto: PostDto, id: number): Promise<IPost | null> => {
    return await this.repository.editPost(dto, id);
  };

  checkPostBelongsToPsychologist = async (postId: number, psychologistId: number): Promise<boolean> => {
    const post = await this.repository.getOnePost(postId);
    return post?.psychologistId === psychologistId;
  };
}
