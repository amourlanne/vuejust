import { Repository } from 'typeorm';
import { User } from '../Entity/User';
import { EntityRepository } from '../Decorators/EntityRepositoryDecorator';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

}
