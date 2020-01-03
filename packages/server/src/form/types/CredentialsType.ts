import { Email, Enum, MaxLength, MinLength, Property, Required } from '@tsed/common';
import { GenderEnum } from '../../enums/GenderEnum';

export class CredentialsType {

  @Required()
  password: string;

}
