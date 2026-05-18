import {Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Patch, Req, ForbiddenException} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @ApiBearerAuth()
    @Roles('admin')
    @UseGuards(JWTAuthGuard, RolesGuard)
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
    remove(@Param('id') id: string, @Req() req) {
        if (req.user.role !== 'admin' && req.user.sub.toString() !== id) {
            throw new ForbiddenException('Bạn không có quyền xóa tài khoản này!');
        }
        return this.usersService.remove(id);
    }

    @ApiBearerAuth()
    @Roles('admin')
    @UseGuards(JWTAuthGuard, RolesGuard)
    @Patch(':id/role')
    updateRole(@Param('id') id: string, @Body('role') role: string) {
        return this.usersService.updateRole(id, role);
    }
}