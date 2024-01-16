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

  getOnePostByAdmin = async (id: number): Promise<IPost | null> => {
    return await this.repository.getOnePostByAdmin(id);
  };

  getAllPost = async (): Promise<IPost[]> => {
    return await this.repository.getAllPost();
  };

  getAllPostByAdmin = async (): Promise<IPost[]> => {
    return await this.repository.getAllPostByAdmin();
  };

  editPostText = async (dto: PostDto, id: number): Promise<IPost | null> => {
    return await this.repository.editPostText(dto, id);
  };

  editPostImage = async (dto: PostDto, id: number): Promise<IPost | null> => {
    return await this.repository.editPostImage(dto, id);
  };

  publishPost = async (id: number) => {
    const publicationDate: Date = new Date();
    return await this.repository.publishPost(id, publicationDate);
  };

  deletePost = async (id: number) => {
    return await this.repository.deletePost(id);
  };
}
