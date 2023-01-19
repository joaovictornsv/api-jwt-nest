import { Injectable } from '@nestjs/common';
import { Customer } from 'src/entities/customer';
import { CustomerRepository } from '../customer-repository';

@Injectable()
export class InMemoryCustomerRepository implements CustomerRepository {
  private readonly customers: Customer[] = [];

  constructor() {
    this.initializeCustomers();
  }

  private initializeCustomers(): void {
    const customer: Customer = {
      id: '466698a1-d186-43ea-a75a-9af3a23e24ef',
      username: 'jvns',
      password: '123',
      role: 'admin',
    };

    this.customers.push(customer);
  }

  async findByUsername(username: string): Promise<Customer | null> {
    const customerFound = this.customers.find(
      (customer) => customer.username === username,
    );

    if (!customerFound) {
      return null;
    }

    return customerFound;
  }

  async findById(customerId: string): Promise<Customer | null> {
    const customerFound = this.customers.find(
      (customer) => customer.id === customerId,
    );

    if (!customerFound) {
      return null;
    }

    return customerFound;
  }
}
