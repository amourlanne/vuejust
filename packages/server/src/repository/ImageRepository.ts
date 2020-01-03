import { Repository } from 'typeorm';
import { EntityRepository } from '../decorators/EntityRepositoryDecorator';
import { Image } from '../entity/Image';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {

}
