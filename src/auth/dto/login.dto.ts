import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'johndoe@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Please Enter the correct email' })
  readonly email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'your-password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
