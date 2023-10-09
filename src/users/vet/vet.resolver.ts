import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { VetService } from './vet.service';
import { ScheduleValidator } from "../../database/validators/schedule.validator";
import { GqlAuthGuard } from "../../guards/auth.guard";

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