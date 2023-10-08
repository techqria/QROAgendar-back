import { Field, ObjectType } from "@nestjs/graphql";
import { ScheduleHoursType } from "./schedule-hours.type ";

@ObjectType()
export class WeekScheduleHoursType {
    @Field()
    first: ScheduleHoursType

    @Field()
    second: ScheduleHoursType

    @Field()
    third: ScheduleHoursType

    @Field()
    fourth: ScheduleHoursType

    @Field()
    fifth: ScheduleHoursType

}