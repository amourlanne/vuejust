import { Inject, Service } from 'typedi';
import { User } from '../entity/User';
import { UserRepository } from '../repository/UserRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { FindConditions, Not, ObjectLiteral } from 'typeorm';
import { FieldNotAvailableError } from '../error/FieldNotAvailableError';

@Service()
export class UserService {
  @InjectRepository() private userRepository: UserRepository;

  // public create(props: User): Promise<User> {
  //   return this.userRepository.persist(props);
  // }
  //
  // public getAll(size: number = 10, page: number = 1): Promise<[User[], number]> {
  //   const skip: number = size * (page - 1);
  //
  //   return this.userRepository.findAndCount({
  //     skip,
  //     take: page
  //   });
  // }

  public getById(id: string): Promise<User|undefined> {
    return this.userRepository.findOne({ where: { id, activated: true }, relations: ['company'] });
  }

  public getByUsername(username: string): Promise<User|undefined> {
    return this.userRepository.findOne({ where: { username, activated: true }, relations: ['company'] });
  }

  public getOne(conditions?: FindConditions<User>): Promise<User|undefined> {
    return this.userRepository.findOne(conditions);
  }

  public getAll(conditions?: FindConditions<User>): Promise<User[]> {
    return this.userRepository.find(conditions);
  }

  public async getByLogs(username: string, password: string): Promise<User|undefined> {
      return this.userRepository.findByLogs(username, password);
  }

  public getByToken(token: string, jwtSecret: string, onlyActivated: boolean = true): Promise<User|undefined> {
    return this.userRepository.findByToken(token, jwtSecret, onlyActivated ? {activated: true} : {});
  }

  public async save(user: User): Promise<User> {
    if( await this.userRepository.findOne({ where: { email: user.email, id: Not(user.id) } })) {
      throw new FieldNotAvailableError('email', user.email)
    }
    return this.userRepository.save(user);
  }

}


