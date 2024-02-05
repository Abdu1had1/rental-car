import { ApiProperty } from '@nestjs/swagger';

export class AuthLogin {
  @ApiProperty({
    description: 'Enter the name',
    example: 'hadi',
  })
  name: string;
  @ApiProperty({
    description: 'Enter the password',
    example: 'hadi12345',
  })
  password: string;
}
 