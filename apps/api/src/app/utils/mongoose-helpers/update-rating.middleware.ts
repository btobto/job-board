import mongoose, { ClientSession, Connection } from 'mongoose';
import { Company } from '../../companies/schemas/company.schema';

export async function updateCompanyRatingMiddleware(
  connection: Connection,
  companyId: string | mongoose.Types.ObjectId,
  rating: number,
  session: ClientSession = null,
  deleteReview: boolean = false
) {
  const company = await connection
    .model(Company.name)
    .findById(companyId)
    .session(session)
    .exec();

  company.ratingsSum += deleteReview ? -rating : rating;
  company.ratingsCount += deleteReview ? -1 : 1;

  await company.save({ session });
}
