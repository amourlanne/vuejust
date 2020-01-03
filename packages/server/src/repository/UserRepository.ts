import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { EntityRepository } from '../decorators/EntityRepositoryDecorator';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

}
