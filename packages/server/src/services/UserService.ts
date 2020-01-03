import { Service } from '@tsed/di';
import { UserRepository } from '../repository/UserRepository';
import { AuthToken } from '../helpers/AuthToken';
import { User } from '../entity/User';
import { FindConditions, FindOneOptions, LessThan, MoreThan } from 'typeorm';

import moment from 'moment';

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

  public getByEmail(email: string, relations: string[] = []): Promise<User> {
    return this.userRepository.findOne({
      relations: relations,
      where: {
        email: email
      }
    });
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

    if(!user || !user.isPassword(password))
      return null;

    const conditions = <FindConditions<User>> {
      id: user.id,
      activated: true,
    };

    return await this.userRepository.findOne(conditions);
  }

  getByAccountConfirmationToken(token: string): Promise<User> {
    try {
      return this.userRepository.createQueryBuilder('user')
        .innerJoinAndSelect('user.accountConfirmationToken', 'token')
        .where("token.value = :value", { value: token })
        .andWhere('token.used = false')
        .andWhere('token.expiredAt >= :expiredAt', { expiredAt: moment().toDate() })
        .getOne();

      // return this.userRepository.findOne({
      //   join: {
      //     alias: "user",
      //     innerJoinAndSelect: {
      //       accountConfirmationToken: "user.accountConfirmationToken",
      //     }
      //   },
      //   where: {
      //     accountConfirmationToken: {
      //       value: token,
      //       used: false,
      //       expiredAt: MoreThan(moment().toDate())
      //     },
      //   }
      // });
    } catch (e) {
      return null
    }
  }

  public save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  getByPasswordResetToken(token: string): Promise<User> {
    try {
      return this.userRepository.createQueryBuilder('user')
        .innerJoinAndSelect('user.passwordResetToken', 'token')
        .where("token.value = :value", { value: token })
        .andWhere('token.used = false')
        .andWhere('token.expiredAt >= :expiredAt', { expiredAt: moment().toDate() })
        .getOne();
    } catch (e) {
      return null
    }
  }
}


