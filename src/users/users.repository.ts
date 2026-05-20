import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/users/schemas/user.schema';
import { CreateUserDto } from '@/users/dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto, hashedPassword?: string): Promise<User> {
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword || createUserDto.password,
      role: 'user',
    });
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-password').exec();
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async update(id: string, updateUserDto: Partial<CreateUserDto>): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-password')
      .exec();
  }

  async remove(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async updatePassword(id: string, hashedPassword: string): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, { password: hashedPassword }, { new: true }).exec();
  }

  async updateRole(id: string, role: string): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, { role }, { new: true })
      .select('-password')
      .exec();
  }
}
