import { PartialType } from '@nestjs/mapped-types';
import { CreateReserveDto } from './create-reserve.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReserveDto extends PartialType(CreateReserveDto) {
    @ApiProperty({
        description: "Enter the pickupDate",
        example: '2024-01-20'
    })
      pickupDate: Date;
      @ApiProperty({
        description: "Enter the returnDate",
        example: '2024-01-20'
    })
      returnDate: Date;
      @ApiProperty({
        description: "Enter the phoneNo",
        example: '+123456789'
    })
      phoneNo: string;
      @ApiProperty({
        description: "Enter the Car Id",
        example: '1'
    })
      carId: number;
      @ApiProperty({
        description: "Enter the Location Id",
        example: '2'
    })
      locationId: number;
      @ApiProperty({
        description: "Enter the Customer Id",
        example: '3'
    })
      customerId: number
    }
