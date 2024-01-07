import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
	execute(url: string): Promise<boolean>;
}

type SuccesCallBack = (() => void) | undefined;

type ErrorCallBack = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
	constructor(
		private readonly logRepository: LogRepository,
		private readonly successCallBack: SuccesCallBack,
		private readonly errorCallBack: ErrorCallBack,
	) {}
	async execute(url: string): Promise<boolean> {
		const originCheck = 'check-service.ts';
		try {
			const req = await fetch(url);
			if (!req.ok) {
				throw new Error(`Error check ${url}`);
			}

			const log = new LogEntity({
				message: `Service ${url} working`,
				level: LogSeverityLevel.low,
				origin: originCheck,
			});

			this.logRepository.saveLog(log);

			this.successCallBack && this.successCallBack();

			return true;
		} catch (error) {
			const errorMessage = `${error}`;

			const log = new LogEntity({
				message: errorMessage,
				level: LogSeverityLevel.high,
				origin: originCheck,
			});

			this.logRepository.saveLog(log);

			this.errorCallBack && this.errorCallBack(`${errorMessage}`);

			return false;
		}
	}
}
