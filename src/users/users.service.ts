import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { RegisterUserResponseDto } from "./register-user.dto";

@Injectable()
export class UsersService {
    saltOrRounds = 10;

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async addUser(username: string, password: string): Promise<RegisterUserResponseDto | false > {
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
        await this.usersRepository.save(user);
        const { passwordHash, ...result } = user;

        return result;
    }

    private findOneByUsernameWithPasswordHash(username: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { username },
            select: ["id", "username", "passwordHash"],            
        });
    }

    private findOneByUsernameWithoutPasswordHash(username: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { username },
        });
    }

    findOneById(id: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { id },
        });
    }

    async isUsernameUsed(username: string): Promise<boolean> {
        const user = await this.findOneByUsernameWithoutPasswordHash(username);

        return user ? true : false;
    }
   
    async findAndCheckUser(username: string, password: string): Promise<User | null > {
        if (!username || !password) {

            throw new Error('username and password are required');
        }
        const user = await this.findOneByUsernameWithPasswordHash(username);
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
