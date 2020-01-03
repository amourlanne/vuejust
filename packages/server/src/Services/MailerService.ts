import { Service } from '@tsed/di';

import Email from 'email-templates';
import config from "../../config"
import { AccountConfirmationToken } from '../Entity/AccountConfirmationToken';
import { User } from '../Entity/User';
import { PasswordResetToken } from '../Entity/PasswordResetToken';

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
