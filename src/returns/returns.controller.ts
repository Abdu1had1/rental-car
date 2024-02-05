import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { ApiResponse, ApiBadRequestResponse, ApiBearerAuth, ApiTags, ApiSecurity } from '@nestjs/swagger';


@ApiBearerAuth()
@Controller('returns')
@ApiTags("Returns")
@ApiSecurity("JWT-auth")


export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Return created successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  createReturn(@Body() createReturnDto: CreateReturnDto) {
    return this.returnsService.createReturn(createReturnDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all returns' })
  getReturns() {
    return this.returnsService.getAllReturns();
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Return updated successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReturnDto: UpdateReturnDto,
  ) {
    await this.returnsService.updateReturn(id, updateReturnDto);
    return { message: 'Return updated successfully', success: true };
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Return deleted successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  async deleteCarById(@Param('id', ParseIntPipe) id: number) {
    await this.returnsService.deleteReturn(id);
    return { message: 'Return deleted successfully', success: true };
  }
}
