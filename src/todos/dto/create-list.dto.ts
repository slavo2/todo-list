import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateListDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;
}
