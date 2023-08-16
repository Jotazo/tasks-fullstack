import { ValidationError } from 'class-validator';
import { CustomErrorHandler } from 'src/custom-error-handler/custom-error-handler';

const errorHandler = new CustomErrorHandler();

const customExceptionFactory = (errors: ValidationError[]) => {
  return errorHandler.handleExceptionFactory(errors);
};

export default customExceptionFactory;

// {
//   "errors": [
//     {
//       "path": "title",
//       "messages": [
//         "title should not be empty",
//         "title must be a string"
//       ]
//     }
//   ],
//   "statusCode": 400
// }
