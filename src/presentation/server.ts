import { LogRepositoryImpl } from '../infrastucture/repositories/log.repository.impl';
// import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastucture/datasources/file-system.datasources';
// import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
	new FileSystemDatasource(),
);

export class Server {
	public static start(): void {
		console.log('server started...');

		const emailService = new EmailService();

		emailService.sendEmail({
			to: 'aldobrunet@icloud.com',
			subject: 'logs sistema prova',
			htmlBody: `
			<h3>Logs de sistemas - Noc </h3>
			<p>Prova send email Aldo</p>
			`,
		});

		// CronService.createJob('*/5 * * * * *', () => {
		// 	const url = 'https://google.com';
		// 	new CheckService(fileSystemLogRepository, undefined, undefined).execute(
		// 		url,
		// 	);
		// });
	}
}
