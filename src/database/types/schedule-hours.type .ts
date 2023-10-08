import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ScheduleHoursType {
    @Field()
    hour: string

    @Field()
    qtt_schedules: number
}