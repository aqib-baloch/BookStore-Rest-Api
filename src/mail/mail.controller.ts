import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { SendEmailDto } from './mail.interface';

@ApiTags('Mail') // This groups the Mail routes under "Mail" in Swagger
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/send-email')
  @ApiBody({
    description: 'Send email with nodemailer',
    type: SendEmailDto, // Swagger will show fields based on the SendEmailDto structure
  })
  @ApiResponse({ status: 201, description: 'Email sent successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async sendMail(@Body() dto: SendEmailDto) {
    // Use the received SendEmailDto directly from the request body
    await this.mailService.sendEmail(dto);
    return { message: 'Email sent successfully!' };
  }
}
