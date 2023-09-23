import { IsByteLength, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(50)
    @IsByteLength(4, 50)    
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(70) 
    @IsByteLength(8, 70)  
    password: string;
}
