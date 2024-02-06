import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/customers/services/customers/customers.service';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomersService,
    private jwtService: JwtService
  ) {}

  async signIn(name: string, password: string): Promise<any> {
    const customer = await this.customersService.findOne(name);
    
    if (!customer) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, customer.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = { sub: customer.id, name: customer.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
