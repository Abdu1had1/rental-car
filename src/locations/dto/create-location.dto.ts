import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {
    @ApiProperty({
        description: "Enter the city",
        example: 'Karachi'
    })
    city: string;
}
