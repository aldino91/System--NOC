import nodemailer from 'nodemailer';
import { envs } from '../../config/envs.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
	to: string | string[];
	subject: string;
	htmlBody: string;
	attachements?: Attachement[];
}

interface Attachement {
	filename: string;
	path: string;
}

export class EmailService {
	private transporter = nodemailer.createTransport({
		service: envs.MAILER_SERVICE,
		auth: {
			user: envs.MAILER_MAIL,
			pass: envs.MAILER_SECRET_KEY,
		},
	});

	async sendEmail(options: SendMailOptions): Promise<boolean> {
		const { htmlBody, subject, to, attachements = [] } = options;

		try {
			const sendInformation = await this.transporter.sendMail({
				to,
				subject,
				html: htmlBody,
				attachments: attachements,
			});

			// console.log(sendInformation);

			return true;
		} catch (error) {
			return false;
		}
	}
	sendEmailWithFileSystemLogs(to: string | string[]) {
		const subject = 'Logs del servidor';
		const htmlBody = `
		<h3>Logs de sistemas - Noc </h3>
		<p>Prova send email Aldo</p>
		`;

		const attachements: Attachement[] = [
			{ filename: 'logs-all.log', path: './logs/logs-all.log' },
			{ filename: 'logs-high.log', path: './logs/logs-high.log' },
			{ filename: 'logs-medium.log', path: './logs/logs-medium.log' },
		];

		return this.sendEmail({
			to,
			subject,
			attachements,
			htmlBody,
		});
	}
}
