import { Customer } from 'src/entities/customer';

export abstract class CustomerRepository {
  abstract findByUsername(username: string): Promise<Customer | null>;
  abstract findById(customerId: string): Promise<Customer | null>;
}
