import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from './Image';

import bcrypt from 'bcryptjs';
import config from '../../config';

@Entity('users')
@Unique(['username'])
@Unique(['email'])
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: config.security.roles,
    default: config.security.roles.user,
  })
  role;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: false })
  activated: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Image, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  avatar: Image;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  isPassword(password: string) {
    return bcrypt.compareSync(password, this.password)
  }
}
