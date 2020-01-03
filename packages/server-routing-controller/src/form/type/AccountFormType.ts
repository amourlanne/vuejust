import { IsEmail, IsNotEmpty } from 'class-validator';

export class AccountFormType {

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;
}
