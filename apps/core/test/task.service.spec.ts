import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsUseCase } from '../src/jornada-pulmonar/application/questions/question.use-case';

describe('QuestionsUseCase', () => {
  let service: QuestionsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionsUseCase],
    }).compile();

    service = module.get<QuestionsUseCase>(QuestionsUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
