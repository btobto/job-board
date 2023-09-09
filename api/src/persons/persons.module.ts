import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonDocument, PersonSchema } from './schemas';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/config/multer-config.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    MulterModule.registerAsync({ useClass: MulterConfigService }),
    JwtModule,
  ],
  controllers: [PersonsController],
  providers: [PersonsService],
  exports: [PersonsService],
})
export class PersonsModule {}
