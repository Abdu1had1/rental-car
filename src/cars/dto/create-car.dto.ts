import { ApiProperty } from "@nestjs/swagger";

export class CreateCarDto {
    @ApiProperty({
        description: "Enter the type",
        example: 'Suv'
    })
    type: string;
}
