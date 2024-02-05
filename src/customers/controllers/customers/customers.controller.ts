import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, SetMetadata } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { LoginCustomerDto } from 'src/customers/dtos/LoginCustomer.dto';
import { UpdateCustomerDto } from 'src/customers/dtos/UpdateCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';
import { Public } from 'src/public.decorator';


@Controller('customers')
@ApiTags("Customers")
@ApiSecurity("JWT-auth")
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get()
  @ApiCreatedResponse({
    description: 'List of Customers',
  })
  getCustomers() {
    return this.customerService.getAllCustomers();
  }

  @Public()
  @Post()
  @ApiCreatedResponse({
    description: 'Created Customer object as response',
    type: CreateCustomerDto, // Assuming CustomerDto is your DTO for response
  })
  @ApiBadRequestResponse({ description: 'Customer was not created. Try Again!' })
  @ApiOperation({ summary: 'Create Customer', operationId: 'createCustomer', security: undefined })
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      const createdCustomer = await this.customerService.createCustomer(createCustomerDto);
      return { message: 'Customer created successfully', success: true, data: createdCustomer };
    } catch (error) {
      // Handle error appropriately based on your application's requirements
      return { message: 'Customer creation failed', success: false, error: error.message };
    }
  }

  @Post('login')
  @ApiCreatedResponse({
    description: 'Logged in Customer object as response',
    type: LoginCustomerDto, // Assuming CustomerDto is your DTO for response
  })
  @ApiBadRequestResponse({ description: 'Login failed. Try Again!' })
  @ApiBody({ type: LoginCustomerDto }) // Specify the request body schema
  async login(@Body() loginDetails: { email: string, password: string }) {
    try {
      const loggedInCustomer = await this.customerService.login(loginDetails.email, loginDetails.password);
      return { message: 'Login successful', success: true, data: loggedInCustomer };
    } catch (error) {
      // Handle error appropriately based on your application's requirements
      return { message: 'Login failed', success: false, error: error.message };
    }
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'Updated Customer object as response',
    type: CreateCustomerDto, // Assuming CustomerDto is your DTO for response
  })
  @ApiBadRequestResponse({ description: 'Customer was not updated. Try Again!' })

  async updateCustomerById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    await this.customerService.updateCustomer(id, updateCustomerDto);
    return { message: 'Customer updated successfully', success: true };
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Deleted Customer object as response',
  })
  @ApiBadRequestResponse({ description: 'Customer was not deleted. Try Again!' })

  async deleteCustomerById(@Param('id', ParseIntPipe) id: number) {
    await this.customerService.deleteCustomer(id);
    return { message: 'Customer deleted successfully', success: true };
  }
}
