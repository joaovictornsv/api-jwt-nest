import { Body, Controller, Post } from '@nestjs/common';
import { CustomerLoginCredentials } from 'src/dtos/customer-credentials-login';
import { LoginUseCase, LoginResponse } from '../usecases/login';

interface LoginControllerResponse {
  access_token: string;
  refresh_token: string;
}

@Controller()
export class LoginController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async handle(
    @Body() body: CustomerLoginCredentials,
  ): Promise<LoginControllerResponse> {
    const tokenPair = await this.loginUseCase.execute(body);

    const response = this.buildResponseToClient(tokenPair);
    return response;
  }

  private buildResponseToClient(
    tokenPair: LoginResponse,
  ): LoginControllerResponse {
    return {
      access_token: tokenPair.accessToken,
      refresh_token: tokenPair.refreshToken,
    };
  }
}
