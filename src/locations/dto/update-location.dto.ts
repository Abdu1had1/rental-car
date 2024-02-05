import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationDto } from './create-location.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
    @ApiProperty({
        description: "Enter the city",
        example: 'Karachi'
    })
    city: string;
}
