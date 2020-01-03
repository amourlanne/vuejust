import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ImageRepository } from '../repository/ImageRepository';
import { Image } from '../entity/Image';
import { DeepPartial } from 'typeorm';

@Service()
export class ImageService {
  @InjectRepository() private imageRepository: ImageRepository;

  public create(image: DeepPartial<Image>): Image {
    return this.imageRepository.create(image);
  }

  public save(image: DeepPartial<Image>): Promise<DeepPartial<Image> & Image> {
    return this.imageRepository.save(image);
  }

  public remove(image: Image){
    return this.imageRepository.remove(image);
  }
}


