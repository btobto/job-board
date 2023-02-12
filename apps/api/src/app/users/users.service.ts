import {
  UserSearchQueryDto,
  UserCreateDto,
  UserUpdateDto,
} from '@nbp-it-job-board/models';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: UserCreateDto): Promise<User> {
    return await this.userModel.create(dto).catch((e) => {
      throw e;
    });
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async search(queryDto: UserSearchQueryDto): Promise<User[]> {
    const query: Record<string, any> = {};

    if (queryDto.name) {
      query['name'] = { $regex: queryDto.name + '.*', $options: 'i' };
    }
    if (queryDto.skills) {
      query['skills'] = { $all: queryDto.skills };
    }
    if (queryDto.location) {
      query['location.country'] = queryDto.location.country;

      if (queryDto.location.city) {
        query['location.city'] = queryDto.location.city;
      }
    }

    console.log(query);

    return await this.userModel
      .find(query)
      .limit(10)
      .select('name skills location')
      .exec();
  }

  async update(id: string, dto: UserUpdateDto): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndRemove(id).exec();
  }
}
