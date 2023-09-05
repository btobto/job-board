import { PersonSearchQueryDto, PersonCreateDto, PersonUpdateDto } from './dto';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
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
import { IMAGE_UPLOAD_CONFIG } from 'src/config/multer-config.service';
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
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: PersonUpdateDto,
  ): Promise<Person> {
    return await this.personsService.update(id, dto);
  }

  @Patch(':id/image')
  @UseGuards(ResourceOwhershipGuard)
  @UseInterceptors(FileInterceptor('image', IMAGE_UPLOAD_CONFIG))
  async uploadImage(
    @Param('id', ParseObjectIdPipe) id: string,
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    return await this.personsService.uploadImage(id, image);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(ResourceOwhershipGuard)
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    await this.personsService.delete(id);
  }
}
