import { IsNotEmpty, IsString } from 'class-validator';

export class CustomerLoginCredentials {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
