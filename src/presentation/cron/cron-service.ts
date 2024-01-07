import { CronJob } from 'cron'

type CronTime = string | Date;
type OnTick = () => void

export class CronService {

    static createJob(CronTime: CronTime, OnTick: OnTick): CronJob {

        const job = new CronJob(
            CronTime,
            OnTick, 
            )
            job.start()

            return job
    }
}