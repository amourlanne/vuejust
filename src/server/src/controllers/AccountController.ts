import { User } from '../entity/User';
import { BodyParam, Get, JsonController, Post, UploadedFile, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';
import { UserService } from '../services/UserService';
import { MailerService } from '../services/MailerService';
import { AuthorizedMiddleware } from '../middlewares/AuthorizedMiddleware';
import { CurrentUser } from '../middlewares/decorators/CurrentUserDecorator';
import fileUploadOptions from '../../config/multer';
import { ImageService } from '../services/ImageService';

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
    @CurrentUser({ required: true }) user: User,
    @BodyParam('firstName') firstName: string,
    @BodyParam('lastName') lastName: string,
    @BodyParam('email') email: string,
    @UploadedFile("avatar", { options: fileUploadOptions }) avatar: any,
  )  {

    if (avatar) {

      const {
        path,
        mimetype,
        filename,
        originalname,
        size
      } = avatar;

      user.avatar = this.imageService.create({
        path: path.replace(/^public\\/g,'http://localhost:3000/'),
        mimeType: mimetype,
        fileName: filename,
        originalName: originalname,
        size
      });
    } else {
      user.avatar = null;
    }

    return this.userService.save(Object.assign(user,{ firstName, lastName, email }));
  }

  @Post("/password")
  public async httpPostAccountPassword(@CurrentUser({ required: true }) user: User)  {
    return user;
  }
}
