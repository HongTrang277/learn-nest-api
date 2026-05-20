import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LoginDto } from '@/auth/dto/login.dto';
import { AuthService } from '@/auth/auth.service';
import { ChangePasswordDto } from '@/auth/dto/changePassword.dto';
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { JWTAuthGuard } from '@/auth/guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  login(@Req() req, @Body() loginDto: LoginDto) {
    return this.authService.signToken(req.user);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  getMe(@Req() req) {
    return req.user;
  }

  @Post('change-password')
  @ApiBearerAuth()
  @ApiBody({ type: ChangePasswordDto })
  @UseGuards(JWTAuthGuard)
  changePassword(@Req() req, @Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(req.user.sub, changePasswordDto);
  }
}
