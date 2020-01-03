import { Entity, JoinColumn, OneToOne, Unique } from 'typeorm';
import { AbstractToken } from './AbstractToken';
import { Required } from '@tsed/common';
import { User } from './User';

import moment from 'moment';

@Entity('account_confirmation_tokens')
@Unique(['user'])
export class AccountConfirmationToken extends AbstractToken {

  constructor() {
    super('30', 'days');
  }

  @Required()
  @OneToOne(() => User, user => user.accountConfirmationToken)
  @JoinColumn()
  user: User;
}
