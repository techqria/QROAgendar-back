import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ScheduleValidator } from 'src/database/validators/schedule.validator';

@Injectable()
export class VetService {
    constructor(
        @Inject('SCHEDULE_MODEL')
        private scheduleModel: Model<ScheduleValidator>
    ) { }

    async getMySchedules(id: string): Promise<ScheduleValidator[]> {
        const schedules = await this.scheduleModel.find({ employee: { id } });
        if (!schedules) throw new NotFoundException('No appointment found.');
        return schedules;
    }
}
