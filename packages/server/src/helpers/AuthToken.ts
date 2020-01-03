import { Req } from '@tsed/common';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { User } from '../Entity/User';
import { IUserTokenPayload } from '../interfaces/IUserTokenPayload';

export class AuthToken {

  private readonly payload: string;
  private readonly signature: string;

  private static readonly secret: string = config.security.authentication.secret;

  private constructor(payload, signature) {
    this.payload = payload;
    this.signature = signature;
  }

  public static fromRequest(request: Req) {

    const {
      token_payload: payload,
      token_signature: signature
    } = request.cookies;

    return new this(payload, signature);
  }

  public static fromUser(user: User) {

    const data = <IUserTokenPayload> {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(data, AuthToken.secret, {/* expiresIn: "1h" */});

    const splitToken = token.split('.');
    const signature = splitToken.pop();
    const payload = splitToken.join('.');

    return new this(payload, signature);
  }

  public getSignature() {
    return this.signature
  }

  public getPayload() {
    return this.payload
  }

  public getValue() {
    this.verify();
    return `${this.payload}.${this.signature}`
  }

  public getData() {
    this.verify();

    try {
      return jwt.verify(this.getValue(), AuthToken.secret)
    } catch (e) {
      throw new Error() /*InvalidTokenError()*/
    }
  }

  public isValid() {
    return this.payload && this.signature
  };

  private verify() {
    if(!this.isValid())
    throw new Error('Call isValid to check token')
  };
}
