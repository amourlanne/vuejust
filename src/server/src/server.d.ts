import { User } from './entity/User';

declare global {
  namespace Express {
    interface AuthInfo {
      token? : string;
      tokenPayload? : string;
      tokenSignature? : string;
    }

    interface Context {
      authInfo: AuthInfo;
      user?: User;
    }

    interface Request {
      context: Context;
    }
  }
}
