import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Post } from '../../entities/post.entity';

export const PostFactory = setSeederFactory(Post, (faker: Faker) => {
  const post = new Post();
  post.title = faker.lorem.words(3);
  post.description = faker.commerce.productDescription();
  post.psychologistId = faker.helpers.arrayElement([1, 2, 3, 4, 5]);
  post.image = 'test-psychologist.png';
  return post;
});
