import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.signIn(loginUserDto.username, loginUserDto.password);
    }
}
