import nodemailer from 'nodemailer';

const MailDevTransport = {
  host: 'localhost',
  port: 1025,
  secure: false,
  ignoreTLS: true
};

export default {
  message: {
    from: 'vuejust <noreply@vuejust.com>',
  },
  send: true,
  preview: false,
  views: {
    options: {
      extension: 'twig',
    },
    root: 'src/templates/email',
  },
  transport: nodemailer.createTransport(MailDevTransport),
};

