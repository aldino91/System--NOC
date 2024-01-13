import { PrismaClient } from '@prisma/client';
import { envs } from './config/envs.plugins';
import { Mongodatabase } from './data/mongo';
import { LogModel } from './data/mongo/models/log.model';
import { Server } from './presentation/server';

(() => {
	main();
})();

async function main() {
	// await Mongodatabase.connect({
	// 	mongoUrl: envs.MONGO_URL,
	// 	dbName: envs.MONGO_DB_NAME,
	// });
	Server.start();
	// console.log(envs.MAILER_MAIL, envs.MAILER_SECRET_KEY);
}
