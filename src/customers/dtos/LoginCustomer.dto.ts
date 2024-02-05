import { ApiProperty } from '@nestjs/swagger';

export class LoginCustomerDto {
  @ApiProperty({
    description: 'Enter the email',
    example: 'Hadi@gmail.com',
  })
  email: string;
  @ApiProperty({
    description: 'Enter the password',
    example: 'Hadi12345',
  })
  password: string;
}
