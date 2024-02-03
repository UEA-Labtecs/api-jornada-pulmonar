import { Test, TestingModule } from '@nestjs/testing';
import { LoggingServiceInterceptor } from './logging.service';

describe('LoggingService', () => {
  let service: LoggingServiceInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggingServiceInterceptor],
    }).compile();

    service = module.get<LoggingServiceInterceptor>(LoggingServiceInterceptor);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
