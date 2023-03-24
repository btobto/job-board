import mongoose, { ClientSession, Connection, Model } from 'mongoose';
import { Company, CompanySchema } from '../../companies/schemas';

export async function updateCompanyRatingMiddleware(
  connection: Connection,
  companyId: string | mongoose.Types.ObjectId,
  rating: number,
  session: ClientSession = null,
  deleteReview: boolean = false
) {
  const company = await connection
    .model<typeof CompanySchema>(Company.name)
    .findById(companyId)
    .session(session)
    .exec();

  company.ratingsSum += deleteReview ? -rating : rating;
  company.ratingsCount += deleteReview ? -1 : 1;

  await company.save({ session });
}
