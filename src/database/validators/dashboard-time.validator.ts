import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { WeekScheduleHoursType } from "../types/week-schedule-hours.type";

@ObjectType()
export class DashboardTimeValidator {
    @Field()
    @IsNotEmpty()
    dateRangeScheduleHours: WeekScheduleHoursType
}