export interface Review {
  _id: string;
  company: string;
  person: string;
  rating: number;
  description?: string;
  datePosted: Date;
}
