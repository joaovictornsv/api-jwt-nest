import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LoginController } from './controllers/login-controller';
import { PrivateResourceController } from './controllers/private-resource-controller';
import { RefreshTokenController } from './controllers/refresh-token-controller';
import { EnsureAuthenticationMiddleware } from './middlewares/ensure-authentication';
import { CustomerRepository } from './repositories/customer-repository';
import { InMemoryCustomerRepository } from './repositories/memory/in-memory-customer-repository';
import { TokenService } from './services/token-service';
import { CustomerTokenPayload, LoginUseCase } from './usecases/login';
import { PrivateResourceUseCase } from './usecases/private-resource';
import { RefreshTokenUseCase } from './usecases/refresh-token';

@Module({
  imports: [],
  controllers: [
    LoginController,
    PrivateResourceController,
    RefreshTokenController,
  ],
  providers: [
    LoginUseCase,
    PrivateResourceUseCase,
    RefreshTokenUseCase,
    TokenService,
    CustomerTokenPayload,
    {
      provide: CustomerRepository,
      useClass: InMemoryCustomerRepository,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAuthenticationMiddleware)
      .forRoutes({ path: '/customers/*', method: RequestMethod.GET });
  }
}
