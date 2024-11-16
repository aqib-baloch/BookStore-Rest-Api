// import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Book } from './schema/book.schema';
// import * as mongoose from 'mongoose';
// import { Query } from 'express-serve-static-core';
// import { User } from '../auth/schemas/user.schema';



// @Injectable()
// export class BookService {

//     constructor(
//         @InjectModel(Book.name)
//         private bookModel : mongoose.Model<Book>
//     ){}

//     async findAll(query: Query): Promise<Book[]>{
        

//         const resPerPage = 10;
//         const currentPage = Number(query.page) || 1;
//         const skip = resPerPage * (currentPage-1);

//         // console.log(query);
        
//         const keyword = query.keyword ? {
//             title: {
//                 $regex: query.keyword,
//                 $options: 'i',
//             }
//         } : {};
//         const books = await this.bookModel.find({...keyword}).limit(resPerPage).skip(skip);
//         return books;
//     }

//     async create(book: Book, user: User): Promise<Book>{
//         const data = Object.assign(book, {user: user._id})

//         const res = await this.bookModel.create(book);
//         return res;
//     } 

//     async findById(id: string): Promise<Book>{
//         const isValidId = mongoose.isValidObjectId(id)

//         if(!isValidId){
//             throw new BadRequestException("Pleae Enter the correct book  id")
//         }
//         const book = await this.bookModel.findById(id);
//         if(!book){
//             throw new NotFoundException("Book not found")
//         }
//         return book;
//     }

//     async UpdateById(id: string, book: Book): Promise<Book>{
//         return await this.bookModel.findByIdAndUpdate(id, book ,{
//             new: true,
//             runValidators: true 
//         })  
//     }

//     async deleteById(id: string): Promise<Book>{
//         return await this.bookModel.findByIdAndDelete(id)  
//     }
// }





import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>,
    ) {}

    async findAll(query: Query): Promise<Book[]> {
        const resPerPage = 10;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        const keyword = query.keyword
            ? {
                  title: {
                      $regex: query.keyword,
                      $options: 'i',
                  },
              }
            : {};
        return await this.bookModel.find({ ...keyword }).limit(resPerPage).skip(skip).exec();
    }

    async findBooksByUser(userId: string, query: Query): Promise<Book[]> {
        const resPerPage = 10;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        const keyword = query.keyword
            ? {
                  title: {
                      $regex: query.keyword,
                      $options: 'i',
                  },
              }
            : {};

        // Fetch books created by the logged-in user
        return await this.bookModel.find({ ...keyword, user: userId }).limit(resPerPage).skip(skip).exec();
    }

    async create(book: Book, user: User): Promise<Book> {
        const data = Object.assign(book, { user: user._id });
        return await this.bookModel.create(data);
    }

    async findById(id: string): Promise<Book> {
        const isValidId = mongoose.isValidObjectId(id);
        if (!isValidId) {
            throw new BadRequestException('Please enter a correct book ID');
        }

        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return book;
    }

    async UpdateById(id: string, book: Book): Promise<Book> {
        return await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<Book> {
        return await this.bookModel.findByIdAndDelete(id);
    }
}

