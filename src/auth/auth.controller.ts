import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthLogin } from 'src/customers/dtos/AuthLogin.dto';
import { Public } from 'src/public.decorator';
  
  @Controller('auth')
  @ApiTags("Auth")

  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiCreatedResponse({
      description: 'Logged in Customer object as response',
      type: AuthLogin, // Assuming CustomerDto is your DTO for response
    })
    @ApiBadRequestResponse({ description: 'Login failed. Try Again!' })
    @ApiBody({ type: AuthLogin })
    @Public()
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.name, signInDto.password);
    }
  
    // @UseGuards(AuthGuard)
    // @Get('profile')
    // getProfile(@Request() req) {
    //   return req.customer;
    // }
  }