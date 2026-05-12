import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsNotEmpty } from 'class-validator';

export class CreateLicenseDto {
  @ApiProperty({ example: 'LEARN-NEST-API' }) 
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: 30 })
  @IsInt()
  @Min(1)
  durationDays: number;
}