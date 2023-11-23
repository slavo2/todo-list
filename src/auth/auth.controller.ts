import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, LoginUserResponseDto } from './login-user.dto';
import { Public } from './public.decorator';
import { ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @ApiBadRequestResponse({ description: 'Bad request.' })
    @ApiUnauthorizedResponse({ description: 'Unathorized.' })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
        return this.authService.signIn(loginUserDto.username, loginUserDto.password);
    }
}
