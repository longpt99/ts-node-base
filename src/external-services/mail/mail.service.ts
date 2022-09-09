import { SendMailParams } from './mail.interface';
import nodemailer from 'nodemailer';
import APP_CONFIG from '../../config/app.config';

export default class MailService {
  private static instance: MailService;
  private transporter: nodemailer.Transporter;

  constructor() {
    if (MailService.instance) {
      return MailService.instance;
    }

    this.transporter = nodemailer.createTransport({
      host: APP_CONFIG.ENV.MAIL_CONFIG.SMTP_CONFIG.HOST,
      port: APP_CONFIG.ENV.MAIL_CONFIG.SMTP_CONFIG.PORT,
      secure: APP_CONFIG.ENV.MAIL_CONFIG.SMTP_CONFIG.SECURE,
      auth: {
        user: APP_CONFIG.ENV.MAIL_CONFIG.SMTP_CONFIG.AUTH.USER,
        pass: APP_CONFIG.ENV.MAIL_CONFIG.SMTP_CONFIG.AUTH.PASS,
      },
    });

    MailService.instance = this;
  }

  async send(params: SendMailParams) {
    return new Promise((resolve, reject) => {
      this.transporter
        .sendMail({
          from: '"Anam Coffee" <youremail@gmail.com>', // sender address
          to: params.to, // list of receivers
          subject: params.subject, // Subject line
          html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
        })
        .then((info) => {
          resolve(info);
        })
        .catch((err) => reject(err));
    });
  }
}
