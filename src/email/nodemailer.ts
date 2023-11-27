import nodemailer from 'nodemailer';
import { EmailMessage } from '../interfaces/email/IEmailMessage';

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'gamma.info@internet.ru',
      pass: 'z1AgtuSr2BQwwCvRmbAA',
    },
  },
  {
    from: 'Gamma <gamma.info@internet.ru>',
  },
);

const mailer = (message: EmailMessage) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return err;
    return 'Email sent: ' + info;
  });
};

export default mailer;
