import { SendMailData, MailAdapter } from "../mail-adapters";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ec7702bcdd088b",
    pass: "ebf62f8ed34740"
  }
});


export class NodemailerMailAdapter implements MailAdapter{
  
  async sendMail ({subject, body}: SendMailData) {

  await transport.sendMail({
    from: "Equipe feedget <oi@feedget.com",
    to: "Antonio Wachave <anthonypaulino32@gmail.com>",
    subject: subject,
    html: body,
  });

  }
}