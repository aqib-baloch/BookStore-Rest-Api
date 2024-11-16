// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { User } from './schemas/user.schema';
// import { Model } from 'mongoose';
// import * as bcrypt from 'bcryptjs'
// import { JwtService } from '@nestjs/jwt';
// import { SignUpDto } from './dto/signup.dto';

// @Injectable()
// export class AuthService {
//     constructor(
//         @InjectModel(User.name)
//         private userModel: Model<User>, 
//         private jwtService: JwtService

//     ){}

//     async signUp(signUpDto: SignUpDto): Promise<{token:string}>{

//         const {name, email, password} = signUpDto

//         const hashedPassword = await bcrypt.hash(password, 10)

//         // private hashedPassword = await bcrypt.hash(password, 10)


//         const user = await this.userModel.create({
//             name,
//             email,
//             password: hashedPassword,
//         })
//         const token = this.jwtService.sign({id: user._id})
//         return { token }
//     }

    
    

// }



import { Injectable, 
        ConflictException, 
        InternalServerErrorException, 
        UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from './enums/role.enum';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // async signUp(signUpDto: SignUpDto): Promise<{token: string}> {
  //     const { name, email, password, role } = signUpDto;
  //     const hashedPassword = await bcrypt.hash(password, 10);

  //     try {
  //         const user = await this.userModel.create({
  //             name,
  //             email,
  //             password: hashedPassword,
  //             role,
  //         });

  //         const token = this.jwtService.sign({ id: user._id });
  //         return { token };
  //     } catch (error) {
  //         // Handle the duplicate key error
  //         if (error.code === 11000) {
  //             throw new ConflictException('Email already exists');
  //         } else {
  //             throw new InternalServerErrorException('Something went wrong');
  //         }
  //     }
  // }

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password, role } = signUpDto;

    // Validate if the role is a valid enum value
    if (!Object.values(Role).includes(role)) {
      throw new ConflictException(
        'Invalid role. Allowed roles are Admin, User, Moderator.',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Create the user with a single role
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        role, // Only one role is assigned
      });

      const token = this.jwtService.sign({ id: user._id });
      return { token };
    } catch (error) {
      // Handle duplicate email error
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('invalid email or Password');
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}

