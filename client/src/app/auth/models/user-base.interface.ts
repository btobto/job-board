import { UserType } from 'src/app/common/enums/user-type.enum';

export interface UserBase {
  _id: string;
  email: string;
  name: string;
  accessToken: string;
}
