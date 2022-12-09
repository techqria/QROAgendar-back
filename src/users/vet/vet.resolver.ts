import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { ScheduleValidator } from 'src/database/validators/schedule.validator';
import { VetService } from './vet.service';

@Resolver(of => ScheduleValidator)
export class VetResolver {
    constructor(private readonly vetService: VetService) { }

    @UseGuards(GqlAuthGuard)
    @Query(() => [ScheduleValidator])
    async getMySchedules(
        @Args('id') id: string
    ): Promise<ScheduleValidator[]> {
        return await this.vetService.getMySchedules(id);
    }
}