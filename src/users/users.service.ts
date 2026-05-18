import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User} from '@/users/schemas/user.schema';
import {Model} from 'mongoose';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    
    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
            role: 'user', 
        });
        return newUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().select('-password').exec();
    }

    async findById(id: string): Promise<User> {
        return this.userModel.findById(id).select('-password').exec();
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.userModel.findOne({ username }).exec();
    }

    async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).select('-password').exec();
    }

    async remove(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id).exec();
    }

    async updatePassword(id: string, hashedPassword: string): Promise<User> {
        return this.userModel.findByIdAndUpdate(
            id,
            { password: hashedPassword },
            { new: true }
        ).exec();
    }

    async updateRole(id: string, role: string): Promise<User> {
        return this.userModel.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        ).select('-password').exec();
    }
}