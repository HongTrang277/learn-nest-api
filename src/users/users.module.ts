import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from '@/users/schemas/user.schema';
import {UsersService} from '@/users/users.service';
import {UsersController} from '@/users/users.controller';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { UsersRepository } from '@/users/users.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
    ],
    controllers: [UsersController],
    providers: [UsersService, RolesGuard, UsersRepository],
    exports: [UsersService, UsersRepository],
})
export class UsersModule {}