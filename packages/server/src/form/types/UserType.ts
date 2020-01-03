import { Email, Enum, MaxLength, MinLength, Property, Required } from '@tsed/common';
import { GenderEnum } from '../../enums/GenderEnum';

export class UserType {

  @Required()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @Required()
  @Email()
  email: string;

  @Property()
  @Required()
  firstName: string;

  @Property()
  @Required()
  lastName: string;

  @Required()
  @Enum(GenderEnum)
  gender: GenderEnum;
}
