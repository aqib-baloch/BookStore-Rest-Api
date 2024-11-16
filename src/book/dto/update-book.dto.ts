import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Category } from "../schema/book.schema";
import { User } from "../../auth/schemas/user.schema";

export class UpdateBookDto{

    
    @IsOptional()
    @IsString()
    readonly title : string;
    @IsOptional()
    @IsString()
    readonly description: string;
    @IsOptional()
    @IsString()
    readonly author : string;
    @IsOptional()
    @IsNumber()
    readonly price: number;
    @IsOptional()
    @IsString()
    @IsEnum(Category, {message: "Please enter the correct category"})
    readonly category: Category;

    @IsEmpty({message: "You cannot passs user id"})
    readonly user: User;

}