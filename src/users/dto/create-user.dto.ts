import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, IsNotEmpty, MinLength, IsEmail, Matches } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'johndoe' })
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: 'Password1!' })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @IsNotEmpty()
    @Matches(/[A-Z]/, { message: 'Password phải có ít nhất 1 chữ hoa' })
    @Matches(/[0-9]/, { message: 'Password phải có ít nhất 1 chữ số' })
    password: string;

    @ApiProperty({ example: 'john@example.com' })
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    @IsNotEmpty()
    email: string;
}