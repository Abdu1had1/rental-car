import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCarDto extends PartialType(CreateCarDto) {
    @ApiProperty({
        description: "Enter the type",
        example: 'Suv'
    })
    type: string;
}
