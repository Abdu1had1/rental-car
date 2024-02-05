import { ApiProperty } from "@nestjs/swagger";

export class CreateReturnDto {
    @ApiProperty({
        description: "Enter the return Date",
        example: '2024-01-20'
    })
    returnDate: Date;
    @ApiProperty({
        description: "Enter the time",
        example: '10:00 Pm'
    })
    time: string;
    @ApiProperty({
        description: "Enter the odometer",
        example: 99
    })
    odometer: number;
    @ApiProperty({
        description: "Enter the fullTank",
        example: true
    })
    fullTank: boolean;
    @ApiProperty({
        description: "Enter the phoneNo",
        example: '+111111111'
    })
    phoneNo: string;
    @ApiProperty({
        description: "Enter the customer Id",
        example: '1'
    })
    customerId: number;
    @ApiProperty({
        description: "Enter the location Id",
        example: '1'
    })
    locationId: number;

}
