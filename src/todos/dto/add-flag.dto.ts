import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class AddFlagDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    flagName: string;
}
