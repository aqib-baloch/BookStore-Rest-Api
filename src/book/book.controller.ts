import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import {
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guards';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  // @Get()
  // @ApiBearerAuth('JWT-auth')
  // @Roles(Role.Moderator, Role.Admin, Role.User)
  // @UseGuards(AuthGuard(), RolesGuard)
  // async getAllBooks(@Req() req, @Query() query: ExpressQuery): Promise<Book[]> {
  //   const user = req.user;

  //   // Ensure the user object and roles are defined
  //   if (!user || !user.role) {
  //     throw new Error('User roles not found');
  //   }

  //   // Check if the user has the 'Admin' role
  //   if (user.role.includes(Role.Admin)) {
  //     // Admin can view all books
  //     return this.bookService.findAll(query);
  //   } else {
  //     // Regular user can only view their own books
  //     return this.bookService.findBooksByUser(user._id, query);
  //   }
  // }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @Roles(Role.Admin) // Admin can view all books
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query); // Admin can access all books
  }

  @Get('my-books/by ID')
  @ApiBearerAuth('JWT-auth')
  @Roles(Role.User, Role.Admin) // Regular user can only view their own books
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiQuery({ name: 'userId', required: true, description: 'ID of the user' })
  async getUserBooks(
    @Query('userId') userId: string,
    @Query() query: ExpressQuery,
  ): Promise<Book[]> {
    return this.bookService.findBooksByUser(userId, query); // User's books only
  }

  @ApiResponse({ status: 201, description: 'Book successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard())
  async createBook(@Body() book: CreateBookDto, @Req() req): Promise<Book> {
    return this.bookService.create(book, req.user);
  }

  @ApiParam({ name: 'id', required: true, description: 'ID of the book' })
  @Get(':id')
  // @ApiBearerAuth('JWT-auth')
  // @Roles(Role.Moderator, Role.Admin, Role.User)
  // @UseGuards(AuthGuard(), RolesGuard)
  async getById(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.UpdateById(id, book);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteById(id);
  }
}
