import { Email, Enum, MaxLength, MinLength, Property, Required } from '@tsed/common';

export class AccountType {

  @Property()
  @Required()
  firstName: string;

  @Property()
  @Required()
  lastName: string;

  @Required()
  @Email()
  email: string;
}
