import { Review } from './review.model';

export type ReviewDto = Pick<Review, 'rating' | 'description'>;
