import { Catch } from '@nestjs/common';
import { ArgumentsHost, ExceptionFilter } from '@nestjs/common/interfaces';
import mongoose, { MongooseError } from 'mongoose';
import { MongoError, MongoServerError } from 'mongodb';
import { HttpStatus } from '@nestjs/common/enums';

@Catch(mongoose.Error, MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: mongoose.Error | MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error.';

    if (exception instanceof mongoose.Error.ValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = `Validation error: ${exception.message}`;
    } else if (exception instanceof mongoose.Error.DocumentNotFoundError) {
      status = HttpStatus.BAD_REQUEST;
      message = `Document doesn't exist: ${exception.message}`;
    } else if (exception instanceof MongoError) {
      switch (exception.code) {
        case 11000:
          status = HttpStatus.CONFLICT;
          // prettier-ignore
          message = `Duplicate key error for: ${
            Object.keys(exception.keyValue).join(', ')
          }`;
      }
    }

    console.error(exception);

    response.status(status).json({
      statusCode: status,
      errorMessage: message,
    });
  }
}

/*
import { Catch } from '@nestjs/common';
import { ArgumentsHost, ExceptionFilter } from '@nestjs/common/interfaces';
import mongoose, { MongooseError } from 'mongoose';
import { MongoServerError  } from 'mongodb';
import { ConflictException } from '@nestjs/common/exceptions';

@Catch(MongooseError, mongoose.mongo.MongoServerError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError | MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof MongooseError) {
    } else if (exception instanceof MongoError) {
      switch (exception.code) {
        case 11000:
          throw new ConflictException('Duplicate: ' + Object.keys(exception.keyValue))
      }
    } else {
    }

    const status = 400;
    const message = ' ';
    const type = ' ';

    response.status(status).json({
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
      errorType: type,
      errorMessage: message,
    });
  }
}
*/
