import {
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

enum ErrorMessages {
  NotFound = 'Task Not Found',
  InvalidId = 'Invalid Id',
}

interface CustomError {
  errors: ValidationErrorParsed[];
  statusCode: HttpStatus;
}

interface ValidationErrorParsed {
  path: string;
  messages: string[];
}

export class CustomErrorHandler {
  private createCustomError(
    results: ValidationErrorParsed[],
    statusCode: HttpStatus,
  ): CustomError {
    return { errors: results, statusCode };
  }

  private createGlobalError(
    messages: string | string[],
    statusCode: HttpStatus,
  ): CustomError {
    const messagesHandled = [];
    if (Array.isArray(messages)) {
      messages.forEach((message) => messagesHandled.push(message));
    } else {
      messagesHandled.push(messages);
    }

    return {
      errors: [{ path: 'global', messages: messagesHandled }],
      statusCode,
    };
  }

  handleCatchErrors(error: any) {
    if (error.name === 'CastError') this.handleInvalidId();
    throw error;
  }

  handleExceptionFactory(errors: ValidationError[]) {
    const result = errors.map((error) => ({
      path: error.property,
      messages: Object.keys(error.constraints).map((k) => error.constraints[k]),
    }));

    const customError = this.createCustomError(result, HttpStatus.BAD_REQUEST);

    return new BadRequestException(customError);
  }

  handleNotFound() {
    const globalError = this.createGlobalError(
      [ErrorMessages.NotFound],
      HttpStatus.NOT_FOUND,
    );
    throw new NotFoundException(globalError);
  }

  handleInvalidId() {
    const globalError = this.createGlobalError(
      [ErrorMessages.InvalidId],
      HttpStatus.BAD_REQUEST,
    );
    throw new BadRequestException(globalError);
  }
}
