import { Service } from '@tsed/di';

import nodemailer from 'nodemailer';
import Email from 'email-templates';
import config from "../../config"

@Service()
export class MailerService {

  public sendMail(mailOptions: Object, transportConf = config.nodemailer.transportOptions) {

    const email = new Email({
      ...config.nodemailer.emailTemplatesOptions,
      transport: nodemailer.createTransport(transportConf)
    });

    return email.send(mailOptions);
  }
}
