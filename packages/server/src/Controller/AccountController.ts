import { BodyParams, Context, Controller, Get, Post, Required } from '@tsed/common';
import { UserService } from '../Services/UserService';
import { User } from '../Entity/User';
import { AccountType } from '../Form/types/AccountType';
import { UserRepository } from '../Repository/UserRepository';
import { MultipartFile } from '@tsed/multipartfiles';

@Controller("/account")
export class AccountController {

  constructor(private readonly userService: UserService,
  private readonly userRepository: UserRepository
  ) {}

  @Post("/profile")
  public accountProfile(
    @Required @Context('user') user: User,
    @MultipartFile("avatar") avatar: Express.Multer.File,
    @Required @BodyParams() accountData: AccountType) {

    return;

    const result = this.userRepository.merge(user, <User>accountData);

    return result;
  }
}
