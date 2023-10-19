import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
    
    async signIn(username: string, password: string): Promise<any> {
        const user = await this.usersService.findAndCheckUser(username, password);
        if (! user) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.username };
        
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
