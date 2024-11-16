import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'johndoe@gmail.com.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Please Enter the correct email' })
  readonly email: string;

  @ApiProperty({
    description: 'Password for the user account( greater than 6',
    example: 'your-password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  // @IsOptional()
  // readonly role: string;

  @ApiProperty({
    description: 'Role of the user, allowed values: Admin, User, Moderator',
    example: 'user/admin',
    enum: Role,
  })
  @IsEnum(Role, { message: 'Role must be Admin, User, or Moderator' })
  role: Role;
}
