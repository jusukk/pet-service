import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreatePetDto {
    @ApiProperty({ example: "Elsa", description: "Name of the Pet" })
    @IsString()
    name: string;

    @ApiProperty({ example: "Bernese mountain dog", description: "Characteristics of the pet" })
    @IsString()
    @Length(10,200)
    description: string;

    @ApiProperty({ example: "02-02-2012" })
    @IsString()
    dateOfBirth?: string;

}