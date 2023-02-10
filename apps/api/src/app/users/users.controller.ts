import { UserRegisterDto, UserUpdateDto } from '@nbp-it-job-board/models';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() dto: UserRegisterDto) {
    this.usersService.register(dto);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Get()
  async searchUsers(@Query('q') query: string) {}

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UserUpdateDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
