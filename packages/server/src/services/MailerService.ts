import { Service } from '@tsed/di';

import nodemailer from 'nodemailer';
import Email from 'email-templates';
import config from "../../config"
import { AccountConfirmationToken } from '../entity/AccountConfirmationToken';
import { User } from '../entity/User';
import { PasswordResetToken } from '../entity/PasswordResetToken';

@Service()
export class MailerService {

  public send(mailOptions: Object) {
    return new Email(config.nodemailer).send(mailOptions);
  }

  public sendAccountConfirmation(user: User, token: AccountConfirmationToken) {

    const mailOptions = {
      template: 'account-confirmation',
      message: {
        to: user.email,
      },
      locals: {
        token: token.value,
      }
    };

    return this.send(mailOptions);

  }

  sendPasswordReset(user: User, token: PasswordResetToken) {
    let mailOptions = {
      template: 'password-reset',
      message: {
        to: user.email,
      },
      locals: {
        token: token.value
      }
    };

    return this.send(mailOptions);
  }
}
