import { Injectable } from '@nestjs/common';
import { Customer } from '../entities/customer';
import { InvalidToken } from '../errors';
import { CustomerRepository } from '../repositories/customer-repository';
import { TokenService } from '../services/token-service';

interface CustomerTokenPayload {
  customer_id: string;
}

interface RefreshTokenRequest {
  refreshToken: string;
}

interface RefreshTokenResponse {
  accessToken: string;
}

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly tokenService: TokenService<CustomerTokenPayload>,
  ) {}

  async execute(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const refreshTokenDecoded = this.verifyRefreshToken(request.refreshToken);

    const customerId = refreshTokenDecoded.customer_id;
    await this.verifyIfCustomerExists(customerId);

    const tokenPayload = this.buildCustomerTokenPayload(customerId);
    const newAccessToken = this.tokenService.generateAccessToken(tokenPayload);
    return {
      accessToken: newAccessToken,
    };
  }

  private async verifyIfCustomerExists(customerId: string): Promise<Customer> {
    const customerFound = await this.customerRepository.findById(customerId);

    if (!customerFound) {
      throw new InvalidToken();
    }

    return customerFound;
  }

  private buildCustomerTokenPayload(customerId: string): CustomerTokenPayload {
    return {
      customer_id: customerId,
    };
  }

  private verifyRefreshToken(refreshToken: string): CustomerTokenPayload {
    try {
      const refreshTokenDecoded = this.tokenService.validateToken(refreshToken);
      return refreshTokenDecoded;
    } catch {
      throw new InvalidToken();
    }
  }
}
