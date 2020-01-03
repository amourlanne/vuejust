import nodemailer from 'nodemailer';
import mailerConfig from '../../config/mailer';
import { Service } from 'typedi';

import Email from 'email-templates';

@Service()
export class MailerService {

  public sendMail(mailOptions: Object, transportConf: Object = mailerConfig.transportOptions) {

    const transporter = nodemailer.createTransport(transportConf);
    const email = new Email({
      ... mailerConfig.emailTemplatesOptions,
      transport: transporter,
    });

    return email.send(mailOptions);
  }
}
