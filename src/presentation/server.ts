import { LogRepositoryImpl } from '../infrastucture/repositories/log.repository.impl';
// import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastucture/datasources/file-system.datasources';
// import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';

const fileSystemLogRepository = new LogRepositoryImpl(
	new FileSystemDatasource(),
);

const emailService = new EmailService();

export class Server {
	public static start(): void {
		console.log('server started...');

		// new SendEmailLogs(emailService, fileSystemLogRepository).execute([
		// 	'aldobrunet@icloud.com',
		// 	'aldobrunet991@gmail.com',
		// ]);

		// CronService.createJob('*/5 * * * * *', () => {
		// 	const url = 'https://google.com';
		// 	new CheckService(fileSystemLogRepository, undefined, undefined).execute(
		// 		url,
		// 	);
		// });
	}
}
