import { OmitType } from "@nestjs/swagger";
import { LoginUserDto } from "src/auth/login-user.dto";
import { User } from "./user.entity";

export class RegisterUserDto extends LoginUserDto {

}

export class RegisterUserResponseDto extends OmitType(User, ['passwordHash'] as const) { }
