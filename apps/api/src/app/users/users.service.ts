import { UserCreateDto, UserUpdateDto } from '@nbp-it-job-board/models';
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

  async search(query: string = ''): Promise<User[]> {
    throw new NotImplementedException();
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
