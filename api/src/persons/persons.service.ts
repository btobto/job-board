import { PersonSearchQueryDto, PersonCreateDto, PersonUpdateDto } from './dto';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { Person, PersonDocument } from './schemas';
import { unlink } from 'fs/promises';

@Injectable()
export class PersonsService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {}

  find(id: string): Promise<Person> {
    return this.personModel.findById(id).orFail().exec();
  }

  findMany(ids: string[]): Promise<Person[]> {
    return this.personModel.find().where('_id').in(ids).exec();
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

  async uploadImage(id: string, image: Express.Multer.File): Promise<Person> {
    const person = await this.personModel.findById(id).orFail().exec();
    if (person.imagePath) {
      await unlink(person.imagePath);
    }

    return this.personModel
      .findByIdAndUpdate(
        id,
        { imagePath: `${image.destination}/${image.filename}` },
        { new: true },
      )
      .orFail()
      .exec();
  }

  update(id: string, dto: PersonUpdateDto): Promise<Person> {
    return this.personModel
      .findByIdAndUpdate(id, dto, { new: true })
      .orFail()
      .exec();
  }

  async delete(id: string) {
    const person = await this.personModel.findByIdAndDelete(id).orFail().exec();
    if (person.imagePath) {
      await unlink(person.imagePath);
    }
  }
}
