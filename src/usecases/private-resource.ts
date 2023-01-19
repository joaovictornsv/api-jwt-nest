import { Injectable } from '@nestjs/common';
import { CustomerSafetyData } from '../dtos/customer-safety-data';
import { Customer } from '../entities/customer';
import { CustomerNotFound } from '../errors';
import { CustomerRepository } from '../repositories/customer-repository';

interface PrivateResourceRequest {
  customerId: string;
}

interface PrivateResourceResponse {
  customer: CustomerSafetyData;
}

@Injectable()
export class PrivateResourceUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(
    request: PrivateResourceRequest,
  ): Promise<PrivateResourceResponse> {
    const customer = await this.findCustomerById(request.customerId);

    const customerSafetyData = this.buildCustomerObjectResponse(customer);
    return customerSafetyData;
  }

  private buildCustomerObjectResponse(
    rawCustomer: Customer,
  ): PrivateResourceResponse {
    return {
      customer: {
        username: rawCustomer.username,
        role: rawCustomer.role,
      },
    };
  }

  private async findCustomerById(customerId: string): Promise<Customer> {
    const customerFound = await this.customerRepository.findById(customerId);

    if (!customerFound) {
      throw new CustomerNotFound();
    }

    return customerFound;
  }
}
