import { Repository } from 'typeorm';
import { EntityRepository } from '../Decorators/EntityRepositoryDecorator';
import { Image } from '../Entity/Image';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {

}
