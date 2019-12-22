import { Column } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Image } from '../../entity/Image';

export class UserFormType {

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  avatar: Image | null;
}
