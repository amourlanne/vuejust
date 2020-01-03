import { Entity, JoinColumn, OneToOne, Unique } from 'typeorm';
import { AbstractToken } from './AbstractToken';
import { Required } from '@tsed/common';
import { User } from './User';

import moment from 'moment';

@Entity('password_reset_tokens')
@Unique(['user'])
export class PasswordResetToken extends AbstractToken {

  constructor() {
    super('1', 'hours');
  }

  @Required()
  @OneToOne(() => User, user => user.passwordResetToken)
  @JoinColumn()
  user: User;
}
