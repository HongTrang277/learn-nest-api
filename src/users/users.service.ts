import {Injectable} from '@nestjs/common';
import {User} from '@/users/schemas/user.schema';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UsersRepository } from '@/users/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}
    
    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return this.usersRepository.create(createUserDto, hashedPassword);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.findAll();
    }

    async findById(id: string): Promise<User | null> {
        return this.usersRepository.findById(id);
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.usersRepository.findByUsername(username);
    }

    async update(id: string, updateUserDto: CreateUserDto): Promise<User | null> {
        return this.usersRepository.update(id, updateUserDto);
    }

    async remove(id: string): Promise<User | null> {
        return this.usersRepository.remove(id);
    }

    async updatePassword(id: string, hashedPassword: string): Promise<User | null> {
        return this.usersRepository.updatePassword(id, hashedPassword);
    }

    async updateRole(id: string, role: string): Promise<User | null> {
        return this.usersRepository.updateRole(id, role);
    }
}