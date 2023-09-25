import { PersonSearchQueryDto, PersonCreateDto, PersonUpdateDto } from './dto';
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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '../common/pipes';
import { Person } from './schemas';
import { PersonsService } from './persons.service';
import { ActiveUser, Public } from 'src/auth/decorators';
import { ResourceOwhershipGuard, RoleGuard } from 'src/auth/guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserType } from 'src/common/enums';
@Controller('persons')
export class PersonsController {
  constructor(private personsService: PersonsService) {}

  @Post('search')
  @HttpCode(HttpStatus.OK)
  async search(@Body() queryDto: PersonSearchQueryDto): Promise<Person[]> {
    return await this.personsService.search(queryDto);
  }

  @Get(':id')
  async get(@Param('id', ParseObjectIdPipe) id: string): Promise<Person> {
    return await this.personsService.find(id);
  }

  @Patch(':id')
  @UseGuards(ResourceOwhershipGuard)
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: PersonUpdateDto,
  ): Promise<Person> {
    return await this.personsService.update(id, dto);
  }

  @Patch(':id/image')
  @UseGuards(ResourceOwhershipGuard, RoleGuard(UserType.Person))
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @ActiveUser() person: Person,
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    return await this.personsService.uploadImage(person, image);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(ResourceOwhershipGuard)
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    await this.personsService.delete(id);
  }
}
