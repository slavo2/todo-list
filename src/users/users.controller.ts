import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "./register-user.dto";
import { UsersService } from "./users.service";
import { Public } from "src/auth/public.decorator";


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    
    @Public()
    @Post()
    async register(@Body() registerUserDto: RegisterUserDto) {
        const result = await this.usersService.addUser(registerUserDto.username, registerUserDto.password);

        if (result === false) {
            throw new BadRequestException('username already used')
        }

        return result
    }
}
