import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './mail.interface';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {}

  mailTransport() {
    //const transporter: nodemailer.Transporter;
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
    return transporter;
  }

  template(html: string, replacements: Record<string, string>) {
    return html.replace(/%(\w*)%/g, function (m, key) {
      return replacements.hasOwnProperty(key) ? replacements[key] : '';
    });
  }

  async sendEmail(dto: SendEmailDto) {
    const { from, recipients, subject } = dto;
    const html = dto.placeholderReplacements
      ? this.template(dto.html, dto.placeholderReplacements)
      : dto.html;

    const transport = this.mailTransport();

    const options: Mail.Options = {
      from: from ?? {
        name: this.configService.get<string>('APP_NAME'),
        address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
      },
      to: recipients,
      subject,
      html,
    };
    try {
      const result = await transport.sendMail(options);
    } catch (error) {
      console.log('Error', error);
    }
  }

  //   async sendMail(
  //     to: string,
  //     subject: string,
  //     text: string,
  //     html: string,
  //   ): Promise<void> {
  //     const from = this.configService.get<string>('MAIL_FROM');
  //     await this.transporter.sendMail({
  //       from: `"NestJS App" <${from}>`, // sender address
  //       to, // receiver address
  //       subject, // Subject line
  //       text, // plain text body
  //       html, // html body
  //     });
  //   }
}
