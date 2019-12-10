import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { Image } from '../entity/Image';

@Service()
@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {

}
