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
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '../common/pipes';
import { Person } from './schemas';
import { PersonsService } from './persons.service';
import { Public } from 'src/auth/decorators';
import { ResourceOwhershipGuard } from 'src/auth/guards';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('persons')
export class PersonsController {
  constructor(private personsService: PersonsService) {}

  @Post('search')
  @HttpCode(HttpStatus.OK)
  async search(@Body() queryDto: PersonSearchQueryDto): Promise<Person[]> {
    console.log(queryDto);
    return await this.personsService.search(queryDto);
  }

  @Get(':id')
  async get(@Param('id', ParseObjectIdPipe) id: string): Promise<Person> {
    return await this.personsService.findById(id);
  }

  @Patch(':id')
  @UseGuards(ResourceOwhershipGuard)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: PersonUpdateDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Person> {
    console.log(dto, image);
    return await this.personsService.update(id, dto, image);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(ResourceOwhershipGuard)
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    await this.personsService.delete(id);
  }
}
