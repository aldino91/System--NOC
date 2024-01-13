import { LogRepositoryImpl } from '../infrastucture/repositories/log.repository.impl';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastucture/datasources/file-system.datasources';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { MongoLogDataSource } from '../infrastucture/datasources/mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../domain/entities/log.entity';
import { PostgresLogDatasource } from '../infrastucture/datasources/postgres-log.datasource';

const logRepository = new LogRepositoryImpl(
	new PostgresLogDatasource(),
	// new FileSystemDatasource(),

	// new MongoLogDataSource(),
);

const emailService = new EmailService();

export class Server {
	public static async start() {
		console.log('server started...');

		// const logs = await logRepository.saveLog(
		// 	new LogEntity({
		// 		level: LogSeverityLevel.low,
		// 		message: 'messaggio cambiato bene',
		// 		origin: 'server.ts',
		// 	}),
		// );

		// console.log(logs);

		// new SendEmailLogs(emailService, fileSystemLogRepository).execute([
		// 	'aldobrunet@icloud.com',
		// 	'aldobrunet991@gmail.com',
		// ]);

		CronService.createJob('*/5 * * * * *', () => {
			const url = 'https://google.com';
			new CheckService(logRepository, undefined, undefined).execute(url);
		});
	}
}
