import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, IsNotEmpty, Matches } from "class-validator";

export class ChangePasswordDto {
    @ApiProperty({ example: 'oldpassword' })
    @IsString()
    @IsNotEmpty()
    oldPassword: string;

    @ApiProperty({ example: 'newpassword' })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @IsNotEmpty()
    @Matches(/[A-Z]/, { message: 'Password phải có ít nhất 1 chữ hoa' })
    @Matches(/[0-9]/, { message: 'Password phải có ít nhất 1 chữ số' })
    newPassword: string;
}
