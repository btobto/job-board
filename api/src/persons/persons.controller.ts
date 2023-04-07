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
  UseGuards,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '../common/pipes';
import { Person } from './schemas';
import { PersonsService } from './persons.service';
import { Public } from 'src/auth/decorators';
import { ResourceOwhershipGuard } from 'src/auth/guards';

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

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(ResourceOwhershipGuard)
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    await this.personsService.delete(id);
  }
}
