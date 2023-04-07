import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Not an ObjectId');
    }
    return value;
  }
}
