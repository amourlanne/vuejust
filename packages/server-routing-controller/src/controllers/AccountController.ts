import { User } from '../entity/User';
import { Image } from '../entity/Image';
import { Body, BodyParam, Get, JsonController, Post, UploadedFile, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';
import { UserService } from '../services/UserService';
import { MailerService } from '../services/MailerService';
import { AuthorizedMiddleware } from '../middlewares/AuthorizedMiddleware';
import { CurrentUser } from '../middlewares/decorators/CurrentUserDecorator';
import fileUploadOptions from '../../config/multer';
import { ImageService } from '../services/ImageService';
import { AccountFormType } from '../form/type/AccountFormType';

@UseBefore(AuthorizedMiddleware)
@JsonController('/account')
export class AccountController {

  @Inject()
  private userService: UserService;

  @Inject()
  private mailerService: MailerService;

  @Inject()
  private imageService: ImageService;

  @Get()
  public async httpGetAccount(@CurrentUser({ required: true }) user: User)  {
    return user;
  }

  @Post("/profile")
  public async httpPostAccountProfile(
    @CurrentUser() user: User,
    @Body() accountForm: AccountFormType,
    @UploadedFile("avatar", { options: fileUploadOptions }) avatarFile: any,
  )  {

    if(avatarFile) {
        const {
          path,
          mimetype,
          filename,
          originalname,
          size
        } = avatarFile;

        const avatar = {
          path: path.replace(/^public\\/g, 'http://localhost:3000/'),
          mimeType: mimetype,
          fileName: filename,
          originalName: originalname,
          size: size,
        }

        // @ts-ignore
      user.avatar = avatar;
    } else if (user.avatar) {
      this.imageService.remove(user.avatar)
    }

    const result = Object.assign(user, accountForm);
    console.log(user, accountForm, result);

    return this.userService.save(Object.assign(user, accountForm));
  }

  @Post("/password")
  public async httpPostAccountPassword(@CurrentUser({ required: true }) user: User)  {
    return user;
  }
}
