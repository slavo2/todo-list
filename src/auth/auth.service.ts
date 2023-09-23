import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }
    
    async signIn(username: string, password: string): Promise<any> {
        const user = await this.usersService.findAndCheckUser(username, password);
        if (! user) {
            throw new UnauthorizedException();
        }
        
        return user;
    }
}
