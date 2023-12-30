import { LangEnum } from 'src/common/enums';

export interface SuperUserInterface {
  firstName: string;
  lastName: string;
  phonenumber: string;
  lang: LangEnum;
  isSuperUser: boolean;
  password: string;
}
