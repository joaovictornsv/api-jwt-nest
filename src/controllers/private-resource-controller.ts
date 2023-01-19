import { Controller, Get, Param } from '@nestjs/common';
import { PrivateResourceUseCase } from 'src/usecases/private-resource';
import { CustomerSafetyData } from '../dtos/customer-safety-data';

interface PrivateResourceControllerResponse {
  customer: CustomerSafetyData;
}

@Controller()
export class PrivateResourceController {
  constructor(
    private readonly privateResourceUseCase: PrivateResourceUseCase,
  ) {}

  @Get('customers/:id')
  async handle(
    @Param('id') customer_id: string,
  ): Promise<PrivateResourceControllerResponse> {
    const customerSafetyData = await this.privateResourceUseCase.execute({
      customerId: customer_id,
    });

    return customerSafetyData;
  }
}
