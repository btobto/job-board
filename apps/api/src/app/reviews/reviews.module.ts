import mongoose, { Connection, Mongoose } from 'mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schemas/review.schema';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Company, CompanySchema } from '../companies/schemas/company.schema';
import { updateCompanyRatingMiddleware } from '../utils/mongoose-helpers/update-rating.middleware';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Review.name,
        useFactory: (connection: Connection) => {
          const schema = ReviewSchema;

          schema.post('findOneAndUpdate', async function (doc, next) {
            // console.log(doc);
            // console.log(this.getOptions());
            // console.log(this.getUpdate());

            const newRating: number = this.getOptions().$locals.newRating;
            const session = this.getOptions().session;

            if (doc.rating != newRating) {
              const company = await connection
                .model<typeof CompanySchema>(Company.name)
                .findById(doc.company)
                .session(session)
                .exec();

              company.ratingsSum += newRating - doc.rating;

              await company.save({ session });
            }

            next();
          });

          schema.post('save', async (doc, next) => {
            // console.log(doc);

            await updateCompanyRatingMiddleware(
              connection,
              doc.company.toString(),
              doc.rating,
              doc.$session()
            );

            next();
          });

          schema.post('findOneAndDelete', async (doc, next) => {
            // console.log(doc);
            // console.log(!!doc.$session());

            await updateCompanyRatingMiddleware(
              connection,
              doc.company.toString(),
              doc.rating,
              doc.$session(),
              true
            );

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
