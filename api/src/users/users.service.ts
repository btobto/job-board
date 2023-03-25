import { UserSearchQueryDto, UserCreateDto, UserUpdateDto } from './dto';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: UserCreateDto): Promise<User> {
    return this.userModel.create({
      ...dto,
      hashedPassword: dto.password,
    });
  }

  findById(id: string): Promise<User> {
    return this.userModel.findById(id).orFail().exec();
  }

  findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  search(queryDto: UserSearchQueryDto): Promise<User[]> {
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

    return this.userModel
      .find(query)
      .limit(10)
      .select('name skills location')
      .exec();
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
