import { Entity } from 'typeorm';
import { AbstractToken } from './AbstractToken';

@Entity('account_confirmation_tokens')
export class AccountConfirmationToken extends AbstractToken{

}
