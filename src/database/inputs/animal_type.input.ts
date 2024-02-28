import { Field, InputType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@InputType()
export class AnimalTypeInput {
    @Field({nullable: true})
    @IsOptional()
    id?: string

    @Field()
    name: string
}