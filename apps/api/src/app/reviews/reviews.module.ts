import mongoose, { Connection, Mongoose } from 'mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schemas/review.schema';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Company } from '../companies/schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Review.name,
        useFactory: (connection: Connection) => {
          const schema = ReviewSchema;

          schema.post('findOneAndUpdate', async function (doc, next) {
            // console.log(this.getOptions());
            // console.log(this.getUpdate());

            const newRating: number = this.getOptions().$locals.newRating;

            if (doc.rating != newRating) {
              const company = await connection
                .model(Company.name)
                .findById(doc.company)
                .exec();

              company.ratingsSum += newRating - doc.rating;

              await company.save();
            }

            next();
          });

          schema.post('save', async (doc, next) => {
            // console.log(doc);

            const company = await connection
              .model(Company.name)
              .findById(doc.company)
              .exec();

            company.ratingsCount += 1;
            company.ratingsSum += doc.rating;

            await company.save();

            next();
          });

          schema.post('findOneAndDelete', async (doc, next) => {
            // console.log(doc);

            const company = await connection
              .model(Company.name)
              .findById(doc.company)
              .exec();

            company.ratingsCount -= 1;
            company.ratingsSum -= doc.rating;

            await company.save();

            next();
          });

          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports: [ReviewsService],
})
export class ReviewsModule {}
