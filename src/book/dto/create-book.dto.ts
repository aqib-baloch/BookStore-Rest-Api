import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Category } from '../schema/book.schema';
import { User } from '../../auth/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'Enter the Title',
    example: 'XYZ',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  @ApiProperty({
    description: 'Enter the Description of the book',
    example: 'This book is contains the contains....',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'Enter the Author name',
    example: 'Mr/Ms XYZ',
  })
  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @ApiProperty({
    description: 'Enter the price of the book',
    example: '100',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    description: 'Enter the Category of the book',
    example: 'Fantasy, Crime, adventure, ',
    enum: Category,
  })
  @IsNotEmpty()
  @IsEnum(Category, { message: 'please enter correct category' })
  readonly category: Category;

  @IsEmpty({ message: 'You cannot passs user id' })
  readonly user: User;
}
