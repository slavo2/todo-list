import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    saltOrRounds = 10;

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async addUser(username: string, password: string): Promise<User | false > {
        if (!username || !password) {

            throw new Error('username and password are required');
        }
        if (await this.isUsernameUsed(username)) {

            return false;
        }
        const hash = await bcrypt.hash(password, this.saltOrRounds);
        const user = new User();
        user.username = username;
        user.passwordHash = hash;
        this.usersRepository.save(user);
        const { passwordHash, ...result } = user;

        return result;
    }

    private findOneByUsernameKeepPasswordHash(username: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ username });
    }

    async isUsernameUsed(username: string): Promise<boolean> {
        const user = await this.findOneByUsernameKeepPasswordHash(username);

        return user ? true : false;
    }
   
    async findAndCheckUser(username: string, password: string): Promise<User | null > {
        if (!username || !password) {

            throw new Error('username and password are required');
        }
        const user = await this.findOneByUsernameKeepPasswordHash(username);
        if (!user) {

            return null;
        }
        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) {

            return null;
        }
        const { passwordHash, ...userWithoutPasswordHash } = user;
    
        return userWithoutPasswordHash;
    }
}
