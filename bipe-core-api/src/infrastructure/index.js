import UserRepositoryClass from './repositories/userRepository';
import QuestionTypeRepositoryClass from './repositories/questionTypeRepository';
import QuestionRepositoryClass from './repositories/questionRepository';

export const UserRepository = new UserRepositoryClass();
export const QuestionTypeRepository = new QuestionTypeRepositoryClass();
export const QuestionRepository = new QuestionRepositoryClass();