import { BodyParams, Context, Controller, ConverterService, Get, InjectorService, Post, Required } from '@tsed/common';
import { UserService } from '../Services/UserService';
import { User } from '../Entity/User';
import { AccountType } from '../Form/types/AccountType';
import { UserRepository } from '../Repository/UserRepository';
import { MultipartFile } from '@tsed/multipartfiles';
import { ImageRepository } from '../Repository/ImageRepository';
import { Image } from '../Entity/Image';

@Controller("/account")
export class AccountController {

  constructor(private readonly userService: UserService,
              private readonly userRepository: UserRepository,
              private readonly imageRepository: ImageRepository,
              private readonly converterService: ConverterService
  ) {
  }

  @Post("/profile")
  public async accountProfile(
    @Required @Context('user') user: User,
    @Required @BodyParams() accountData: AccountType,
    @MultipartFile("avatar") avatar: Express.Multer.File,
    ) {

    const result = this.converterService.deserialize(accountData, AccountType);

    console.log(result, accountData);


    // const form = this.createForm(AccountType, user);
    // form.handleData(accountData);
    //
    // if (form.isSubmitted() && form.isValid()) {
    //   user = form.getData();
    // }

    // @ts-ignore
    if(accountData.avatar === 'null' && user.avatar) {
      await this.imageRepository.remove(user.avatar);
    } else if(avatar) {
      if(user.avatar) {
        await this.imageRepository.remove(user.avatar);
      }
      user.avatar = <Image> {
        path: 'media/' + avatar.filename,
        originalName:  avatar.originalname,
        fileName: avatar.filename,
        mimeType: avatar.mimetype,
        size: avatar.size
      };
    }
    console.log(user);

    this.userRepository.merge(user, <User>accountData);
    await this.userRepository.save(user);

    return user;
  }
}
