import { CronJob } from 'cron';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import type { CreateCatDto } from './dto/create-cat.dto';
import type { Cat } from './schemas/cats.schema';

@Injectable()
export class CatsTasks {
  private readonly logger = new Logger(CatsTasks.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'CreateCat',
  })
  async createCat() {
    const cat: CreateCatDto = {
      name: ['Cat', 'Dog', 'Bird', 'Fish', 'Hamster'][
        Math.floor(Math.random() * 5)
      ],
      age: Math.floor(Math.random() * 10) + 1,
      breed: ['Breed', 'Dog', 'Bird', 'Fish', 'Hamster'][
        Math.floor(Math.random() * 5)
      ],
    };

    const response = await fetch('http://localhost:3000/v1/cats', {
      method: 'POST',
      body: JSON.stringify(cat),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = (await response.json()) as Cat;
    this.logger.log('Cat created:', data);

    this.addDeleteCatJob(data.id);
  }

  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'CheckActiveJobs',
  })
  checkActiveJobs() {
    const jobs = this.schedulerRegistry.getCronJobs();
    this.logger.debug(`Active jobs: ${jobs.size}`);
  }

  addDeleteCatJob(id: string) {
    const jobName = `deleteCat-${id}`;

    const job = CronJob.from({
      start: true,
      name: jobName,
      cronTime: new Date(Date.now() + 10000), // 10 seconds from now
      onTick: async () => {
        const response = await fetch(`http://localhost:3000/v1/cats/${id}`, {
          method: 'DELETE',
        });
        await response.json();
        this.logger.log('Cat deleted:', id);

        this.schedulerRegistry.deleteCronJob(jobName);
        this.logger.debug(`Job ${jobName} deleted`);
      },
    });

    this.schedulerRegistry.addCronJob(jobName, job);
    this.logger.debug(`Job ${jobName} added`);
  }
}
