import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from '../src/jornada-pulmonar/presentation/question.controller';
import { QuestionsUseCase } from '../src/jornada-pulmonar/application/questions/question.use-case';

describe('QuestionController', () => {
  let controller: QuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [QuestionsUseCase],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
