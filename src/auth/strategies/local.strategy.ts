import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Strategy } from "passport-local";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        });
    }
    async validate(username: string, password: string) {
        const user = await this.usersService.findByUsername(username);
        if (!user) {
            throw new UnauthorizedException('User không tồn tại!');
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Sai mật khẩu cũ!');
        }
        return { sub: user._id, username: user.username };
    }
}