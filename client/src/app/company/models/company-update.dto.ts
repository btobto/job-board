import { Location } from 'src/app/common/models/location.interface';

export interface CompanyUpdateDto {
  name?: string;
  website?: string;
  description?: string;
  offices?: Location[];
}
