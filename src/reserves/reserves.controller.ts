import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReservesService } from './reserves.service';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { ApiResponse, ApiBadRequestResponse, ApiBearerAuth, ApiTags, ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@Controller('reserves')
@ApiTags("Reserves")
@ApiSecurity("JWT-auth")
@UseGuards(AuthGuard)


export class ReservesController {
  constructor(private readonly reservesService: ReservesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Reserve created successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  createReserve(@Body() createReserveDto: CreateReserveDto) {
    return this.reservesService.createReserve(createReserveDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all reserves' })
  getReserves() {
    return this.reservesService.getAllReserves();
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Reserve updated successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  async updateReserveById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReserveDto: UpdateReserveDto,
  ) {
    await this.reservesService.updateReserve(id, updateReserveDto);
    return { message: 'Reserve updated successfully', success: true };
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Reserve deleted successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  async deleteReserveById(@Param('id', ParseIntPipe) id: number) {
    await this.reservesService.deleteReserve(id);
    return { message: 'Reserve deleted successfully', success: true };
  }
}
