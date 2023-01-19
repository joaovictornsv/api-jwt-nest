import { Controller, Headers, Post } from '@nestjs/common';
import { RefreshTokenUseCase } from '../usecases/refresh-token';

interface RefreshTokenControllerResponse {
  access_token: string;
}

class RefreshTokenRequestHeaders {
  refresh_token: string;
}

@Controller()
export class RefreshTokenController {
  constructor(private readonly refreshTokenUseCase: RefreshTokenUseCase) {}

  @Post('refresh_token')
  async handle(
    @Headers() headers: RefreshTokenRequestHeaders,
  ): Promise<RefreshTokenControllerResponse> {
    const newToken = await this.refreshTokenUseCase.execute({
      refreshToken: headers.refresh_token,
    });

    const response = this.buildResponseToClient(newToken.accessToken);
    return response;
  }

  private buildResponseToClient(
    accessToken: string,
  ): RefreshTokenControllerResponse {
    return {
      access_token: accessToken,
    };
  }
}
