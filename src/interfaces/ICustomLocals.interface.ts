import { IUserTokenData, IUserJwtPayload } from './IUser.interface';

interface ICustomLocals {
  patientTokenData?: IUserTokenData;
  userJwtPayload?: IUserJwtPayload;
}

export default ICustomLocals;
