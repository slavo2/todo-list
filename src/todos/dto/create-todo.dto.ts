import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateTodoDto { 
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(250)
    text: string;

    @IsOptional()
    @IsString()
    @IsDateString()
    deadline: Date;

    @IsUUID()
    listId: string;
}
