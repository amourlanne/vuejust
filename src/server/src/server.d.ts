import { User } from './entity/User';

declare global {
  namespace Express {
    // tslint:disable-next-line:no-empty-interface
    interface AuthInfo {
      token? : string;
      tokenPayload? : string;
      tokenSignature? : string;
    }

    interface Request {
      authInfo: AuthInfo;
      user?: User;
    }
  }
}
