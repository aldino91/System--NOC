import { envs } from './config/envs.plugins';
import { Server } from './presentation/server';

(() => {
	main();
})();

function main(): void {
	Server.start();
	// console.log(envs.MAILER_MAIL, envs.MAILER_SECRET_KEY);
}
