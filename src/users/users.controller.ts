import {Controller, Get, Post, Body, Param, Put, Delete, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @ApiBearerAuth()
    @UseGuards(JWTAuthGuard)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }


    @Get(':id')
    findById(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    @ApiBearerAuth()
    @UseGuards(JWTAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @ApiBearerAuth()
    @UseGuards(JWTAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}