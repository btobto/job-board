import { UserSearchQueryDto, UserCreateDto, UserUpdateDto } from './dto';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { User, UserDocument } from './schemas';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findById(id: string): Promise<User> {
    return this.userModel.findById(id).orFail().exec();
  }

  findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  search(queryDto: UserSearchQueryDto): Promise<User[]> {
    let query = this.userModel.find();

    if (queryDto.name) {
      query.where({ name: { $regex: '^' + queryDto.name, $options: 'i' } });
    }
    if (queryDto.skills) {
      query.where({ skills: { $all: queryDto.skills } });
    }
    if (queryDto.location) {
      query.where('location.country').equals(queryDto.location.country);

      if (queryDto.location.city) {
        query.where('location.city').equals(queryDto.location.city);
      }
    }

    console.log(query);

    return query.limit(10).select('name skills location').exec();
  }

  update(id: string, dto: UserUpdateDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .orFail()
      .exec();
  }

  delete(id: string) {
    return this.userModel.findByIdAndDelete(id).orFail().exec();
  }
}
