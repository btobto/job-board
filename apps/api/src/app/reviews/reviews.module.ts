import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schemas/review.schema';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { CompaniesModule } from '../companies/companies.module';
import { CompaniesService } from '../companies/companies.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Review.name,
        imports: [forwardRef(() => CompaniesModule)],
        useFactory: (companiesService: CompaniesService) => {
          const schema = ReviewSchema;

          schema.post('save', (doc, next) => {
            console.log('post save working');
            companiesService.updateRating(doc.company.toString(), doc.rating);
            next();
          });

          schema.post('findOneAndDelete', (doc, next) => {
            console.log('post findOneAndDelete working');
            companiesService.updateRating(doc.company, doc.rating, true);
            next();
          });

          return schema;
        },
        inject: [CompaniesService],
      },
    ]),
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports: [ReviewsService],
})
export class ReviewsModule {}
