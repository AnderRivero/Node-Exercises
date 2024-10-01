import nodemailer from "nodemailer";
import { evns } from "../../config/plugins/envs.plugins";
import { LogRepository } from "../../domain/repository/log.repository";

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: evns.MAILER_SERVICES,
    auth: {
      user: evns.MAILER_EMAIL,
      pass: evns.SECRET_KEY_EMAIL,
    },
  });

  async sendMail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });
      console.log(sentInformation);

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const htmlBody = `
    <h3>Logs del Sistema</h3
    <p>Lorem ipsum </p>
    <p>ver logs adjuntos</p>
    `;
    const subject = "Logs del Servidor";
    const attachments: Attachment[] = [
      { filename: "logs-all.log", path: "./logs/logs-all.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
    ];

    return this.sendMail({ to, subject, htmlBody, attachments });
  }
}
