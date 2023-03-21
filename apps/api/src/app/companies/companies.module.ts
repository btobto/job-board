import { forwardRef, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { PostingsModule } from '../postings/postings.module';
import { PostingsService } from '../postings/postings.service';
import { ReviewsModule } from '../reviews/reviews.module';
import { ReviewsService } from '../reviews/reviews.service';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { Company, CompanySchema } from './schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Company.name,
        imports: [ReviewsModule, PostingsModule],
        useFactory: (
          reviewsService: ReviewsService,
          postingsService: PostingsService
        ) => {
          const schema = CompanySchema;

          schema.post('findOneAndDelete', async function (doc, next) {
            await postingsService.deleteAllCompanyPostings(doc.id);
            await reviewsService.deleteAllCompanyReviews(doc.id);
            next();
          });

          return schema;
        },
        inject: [ReviewsService, PostingsService],
      },
    ]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
