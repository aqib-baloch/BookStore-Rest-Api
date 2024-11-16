import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
constructor(private authService: AuthService){}


@ApiResponse({ status: 201, description: 'You have successfully signup ' })
@ApiResponse({ status: 400, description: 'Invalid input data.' })

@Post('/signup')
signUp(@Body()signUpDto: SignUpDto): Promise<{token: string}>{
    return this.authService.signUp(signUpDto)
}

@ApiResponse({ status: 201, description: 'You have successfully signup ' })
@ApiResponse({ status: 400, description: 'Invalid input data.' })


@Post('/login')
login(@Body()loginDto: LoginDto): Promise<{token: string}>{
    return this.authService.login(loginDto)
}
}
