import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCustomerCredentials extends HttpException {
  constructor() {
    super('Invalid customer credentials', HttpStatus.FORBIDDEN);
  }
}

export class InvalidToken extends HttpException {
  constructor() {
    super('Invalid token', HttpStatus.FORBIDDEN);
  }
}

export class CustomerNotFound extends HttpException {
  constructor() {
    super('Customer not found', HttpStatus.NOT_FOUND);
  }
}
