import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    // Use Gmail, Outlook, or any SMTP service
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendContactEmail(name: string, email: string, message: string) {
    console.log('Sending message');
    await this.transporter.sendMail({
      from: `"Portfolio Contact" <${email}>`, // Sender address
      to: 'debanjansaha1992@gmail.com', // List of receivers
      subject: `New Message from ${name}`, // Subject line
      html: `
        <h3>New Portfolio Inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
  }
}
