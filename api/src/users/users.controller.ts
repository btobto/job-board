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
  UseGuards,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '../common/pipes';
import { User } from './schemas';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators';
import { ResourceOwhershipGuard } from 'src/auth/guards';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('search')
  @Public()
  async searchUsers(@Body() queryDto: UserSearchQueryDto): Promise<User[]> {
    console.log(queryDto);
    return await this.usersService.search(queryDto);
  }

  @Get(':id')
  async getUser(@Param('id', ParseObjectIdPipe) id: string): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Patch(':id')
  @UseGuards(ResourceOwhershipGuard)
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UserUpdateDto,
  ): Promise<User> {
    return await this.usersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(ResourceOwhershipGuard)
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    await this.usersService.delete(id);
  }
}
