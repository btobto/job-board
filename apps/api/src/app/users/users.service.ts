import { UserRegisterDto, UserUpdateDto } from '@nbp-it-job-board/models';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(dto: UserRegisterDto): Promise<User> {
    const createdUser = await this.userModel.create(dto);
    return createdUser;
  }

  async getUser(id: string) {
    return this.userModel.findById(id).exec();
  }

  async search(query: string) {}

  async update(id: string, dto: UserUpdateDto): Promise<User> {
    const existingUser = await this.userModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!existingUser) {
      throw new NotFoundException("User doesn't exist");
    }

    return existingUser;
  }

  async delete(id: string) {
    const deletedUser = await this.userModel.findByIdAndRemove(id).exec();

    // if ...

    return deletedUser;
  }
}
