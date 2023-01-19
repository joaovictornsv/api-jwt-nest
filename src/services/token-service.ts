import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

class TokenPair {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
  ) {}
}

@Injectable()
export class TokenService<Payload> {
  private readonly JWT_SECRET = '6b795d4f-47b9-4b34-ba04-90eda066f312';
  private readonly ACCESS_TOKEN_SECONDS_EXPIRATION = 60 * 60; // 1 hour = 3600 seconds
  private readonly REFRESH_TOKEN_SECONDS_EXPIRATION = 60 * 60 * 24 * 365; // 1 year = 31536000 seconds

  public generateTokenPair(payload: Payload): TokenPair {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  public generateAccessToken(payload: Payload): string {
    const accessToken = this.generateGenericToken(payload);
    return accessToken;
  }

  public generateRefreshToken(payload: Payload): string {
    const refreshToken = this.generateGenericToken(
      payload,
      this.REFRESH_TOKEN_SECONDS_EXPIRATION,
    );
    return refreshToken;
  }

  private generateGenericToken(
    payload: any,
    expirationInSeconds = this.ACCESS_TOKEN_SECONDS_EXPIRATION,
  ): string {
    const token = sign(payload, this.JWT_SECRET, {
      expiresIn: expirationInSeconds,
    });
    return token;
  }

  public validateToken(token: string): Payload {
    const tokenPayload = verify(token, this.JWT_SECRET);
    return tokenPayload as Payload;
  }
}
