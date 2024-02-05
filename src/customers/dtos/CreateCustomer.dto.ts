import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto {
    @ApiProperty({
        description: "Enter the name",
        example: 'Hadi'
    })
    name: string;

    @ApiProperty({
        description: "Enter the email",
        example: 'Hadi@gmail.com'
    })
    email: string;
    @ApiProperty({
        description: "Enter the password",
        example: 'Hadi12345'
    })
    password: string;

    @ApiProperty({
        description: "Enter the address",
        example: 'Mustafa town'
    })
    address: string;
}