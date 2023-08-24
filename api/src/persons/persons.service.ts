import { PersonSearchQueryDto, PersonCreateDto, PersonUpdateDto } from './dto';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { Person, PersonDocument } from './schemas';

@Injectable()
export class PersonsService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {}

  findById(id: string): Promise<Person> {
    return this.personModel.findById(id).orFail().exec();
  }

  findByEmail(email: string): Promise<Person> {
    return this.personModel.findOne({ email }).lean().exec();
  }

  search(queryDto: PersonSearchQueryDto): Promise<Person[]> {
    let query = this.personModel.find();

    if (queryDto.name) {
      query.where({ name: { $regex: '^' + queryDto.name, $options: 'i' } });
    }
    if (queryDto.skills) {
      query.where({ skills: { $all: queryDto.skills } });
    }
    if (queryDto.location) {
      query.where('location.country').equals(queryDto.location.country);

      if (queryDto.location.city) {
        query.where('location.city').equals(queryDto.location.city);
      }
    }

    console.log(query);

    return query.limit(10).select('name skills location').exec();
  }

  update(
    id: string,
    dto: PersonUpdateDto,
    img?: Express.Multer.File,
  ): Promise<Person> {
    return this.personModel
      .findByIdAndUpdate(
        id,
        img ? { ...dto, imagePath: '/' + img.filename } : { ...dto },
        {
          new: true,
        },
      )
      .orFail()
      .exec();
  }

  delete(id: string) {
    return this.personModel.findByIdAndDelete(id).orFail().exec();
  }
}
