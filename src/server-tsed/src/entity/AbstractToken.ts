import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Required } from '@tsed/common';

@Entity('account_confirmation_tokens')
export class AccountConfirmationToken {

  @Required()
  @PrimaryGeneratedColumn()
  id: number;

  @Required()
  @Column()
  value: string;

  @Required()
  @Column()
  valid: boolean;

  @Required()
  @Column()
  expiredAt: Date;
}
