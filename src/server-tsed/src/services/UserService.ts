import { Service } from '@tsed/di';
import { UserRepository } from '../repository/UserRepository';
import { AuthToken } from '../helpers/AuthToken';
import { User } from '../entity/User';
import { FindConditions, FindOneOptions } from 'typeorm';

import jwt from 'jsonwebtoken';
import config from '../../config';

@Service()
export class UserService {

  constructor(private readonly userRepository: UserRepository) {}

  public getAll() {
    return this.userRepository.find();
  }

  public getByAuthToken(token: AuthToken): Promise<User> {

    const data = token.getData();

    if(!data)
      return null;

    const conditions = <FindConditions<User>> {
      id: data.id,
      activated: true,
    };

    return this.userRepository.findOne(conditions);
  }

  public async getByCredentials(username: string, password: string): Promise<User> {

    const options = <FindOneOptions<User>> {
      select: [
        'id',
        'password'
      ],
      where: [
        { username: username, activated: true },
        { email: username, activated: true },
      ],
    };

    const user = await this.userRepository.findOne(options);

    if(!user.isPassword(password))
      return null;

    const conditions = <FindConditions<User>> {
      id: user.id,
      activated: true,
    };

    return await this.userRepository.findOne(conditions);
  }

  getByAccountConfirmationToken(token: string): Promise<User> {
    try {
      const data = jwt.verify(token, config.security.account.confirmation);

      const conditions = <FindConditions<User>> {
        id: data.id
      };

      return this.userRepository.findOne(conditions);
    } catch (e) {
      return null
    }
  }

  public save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}


