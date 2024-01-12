import { envs } from './config/envs.plugins';
import { Mongodatabase } from './data/mongo';
import { LogModel } from './data/mongo/models/log.model';
import { Server } from './presentation/server';

(() => {
	main();
})();

async function main() {
	await Mongodatabase.connect({
		mongoUrl: envs.MONGO_URL,
		dbName: envs.MONGO_DB_NAME,
	});

	const newLog = await LogModel.create({
		message: 'Test message',
		origin: 'App.ts',
		level: 'low',
	});

	await newLog.save();

	console.log(newLog);
	// Server.start();
	// console.log(envs.MAILER_MAIL, envs.MAILER_SECRET_KEY);
}
