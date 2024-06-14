import { QuestionRepository } from '../../application/questions/question-repository';
import { QuestionsUseCase } from '../../application/questions/question.use-case';
import { UpdateQuestionController } from '../../presentation/handle/questions/update-task.handle';
import { UpdateQuestionDto } from '../../presentation/dto/update-task.dto';
import { ModulesRepository } from '../../application/modules/modules-repository';
import { OptionsRepository } from '../../application/options/options-repository';
import { ResponsesRepository } from '../../application/response/response-repository';

export const makeUpdateQuestionController = (id: string, body: any) => {
  const repository = new QuestionRepository();
  const repositoryMod = new ModulesRepository();
  const repositoryOp = new OptionsRepository();
  const repositoryRes = new ResponsesRepository();

  const service = new QuestionsUseCase(repository, repositoryMod, repositoryOp, repositoryRes);
  return new UpdateQuestionController(service, id, body);
};
