import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { username, password } = loginDto;

    const user = await this.usersService.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Sai username hoặc password!');
    }

    const payload = { sub: user._id, username: user.username };

    // Ký JWT và trả về accessToken
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
    const { oldPassword, newPassword } = changePasswordDto;

    const user = await this.usersService.findById(id);
    if (!user) {
      throw new UnauthorizedException('User không tồn tại!');
    }

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      throw new UnauthorizedException('Sai mật khẩu cũ!');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersService.updatePassword(id, hashedPassword);
    return { message: 'Đổi mật khẩu thành công!' };
  }

  async signToken(user: { sub: any; username: string }): Promise<{ accessToken: string }> {
    const payload = { sub: user.sub, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
