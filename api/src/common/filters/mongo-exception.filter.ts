import { Catch, HttpException } from '@nestjs/common';
import { ArgumentsHost, ExceptionFilter } from '@nestjs/common/interfaces';
import mongoose, { MongooseError } from 'mongoose';
import { MongoError, MongoServerError } from 'mongodb';
import { HttpStatus } from '@nestjs/common/enums';
import { Request, Response } from 'express';
import { MongoErrorCodes } from '../constants';

@Catch(mongoose.Error, MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: mongoose.Error | MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error.';

    if (exception instanceof mongoose.Error.ValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = `Validation error. ${exception.message}`;
    } else if (exception instanceof mongoose.Error.DocumentNotFoundError) {
      const filterMessage = Object.entries(exception.filter)
        .map(([k, v]) => `'${k}': '${v}'`)
        .join(', ');
      const modelName = exception.message.split('"').slice(-2)[0];

      status = HttpStatus.BAD_REQUEST;
      message = `Document doesn't exist. No '${modelName}' document found for: ${filterMessage}`;
    } else if (exception instanceof MongoServerError) {
      switch (exception.code) {
        case MongoErrorCodes.DUPLICATE_KEY:
          status = HttpStatus.CONFLICT;
          // prettier-ignore
          message = `Duplicate key error for: ${
            Object.keys(exception.keyValue,).join(', ')
          }`;
      }
    }

    console.error(exception);

    const errorName = HttpStatus[status]
      .toLowerCase()
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    response.status(status).json({
      statusCode: status,
      error: errorName,
      message,
    });
  }
}
