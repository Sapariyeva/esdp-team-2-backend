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

  async getOnePost(id: number): Promise<IPost | null> {
    return await this.findOne({ where: { id } });
  }

  async getAllPost(): Promise<IPost[]> {
    return await this.find();
  }

  async editPostText(dto: PostDto, id: number): Promise<IPost | null> {
    const { title, description } = dto;
    const result = await this.update(id, { title, description });
    return result.affected ? dto : null;
  }

  async editPostImage(dto: PostDto, id: number): Promise<IPost | null> {
    const { image } = dto;
    const result = await this.update(id, { image });
    return result.affected ? dto : null;
  }

  getPostById = async (id: number): Promise<IPost | null> => {
    return await this.findOne({ where: { id } });
  };
}
