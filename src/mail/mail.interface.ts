import { Address } from 'nodemailer/lib/mailer';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty({ type: String, example: 'test@example.com' })
  from?: Address;

  @ApiProperty({
    type: [Object],
    example: [{ name: 'John Doe', address: 'johndoe@example.com' }],
  })
  recipients: Address[];

  @ApiProperty({ type: String, example: 'Test Subject' })
  subject: string;

  @ApiProperty({ type: String, example: '<p>Hello %name%</p>' })
  html: string;

  @ApiProperty({
    type: Object,
    example: { name: 'John', number: '42' },
  })
  placeholderReplacements?: Record<string, string>;
}
