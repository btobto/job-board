import { UserSearchQueryDto, UserCreateDto, UserUpdateDto } from './dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '../common/pipes';
import { User } from './schemas';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post('search')
  async searchUsers(@Body() queryDto: UserSearchQueryDto): Promise<User[]> {
    console.log(queryDto);
    return await this.usersService.search(queryDto);
  }

  @Get(':id')
  async getUser(@Param('id', ParseObjectIdPipe) id: string): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UserUpdateDto,
  ): Promise<User> {
    return await this.usersService.update(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    await this.usersService.delete(id);
  }
}
