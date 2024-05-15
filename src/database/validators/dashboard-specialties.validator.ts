import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { SpecialtyType } from "../types/specialty.type ";

@ObjectType()
export class DashboardSpecialtiesValidator {
    @Field(type => [SpecialtyType])
    @IsNotEmpty()
    specialties: SpecialtyType[]
}