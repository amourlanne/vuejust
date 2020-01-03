import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn, OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Image } from './Image';
import { AccountConfirmationToken } from './AccountConfirmationToken';

import bcrypt from 'bcryptjs';

import { RoleEnum } from '../enums/RoleEnum';
import { GenderEnum } from '../enums/GenderEnum';

import { Email, Enum, MaxLength, MinLength, Property, Required } from '@tsed/common';
import { PasswordResetToken } from './PasswordResetToken';

@Entity('users')
@Unique(['username'])
@Unique(['email'])
export class User {

  @Required()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Required()
  @MinLength(5)
  @MaxLength(20)
  @Column()
  username: string;

  @Required()
  @Email()
  @Column()
  email: string;

  @Property()
  @Column({
    select: false,
    nullable: true
  })
  password: string;

  @Required()
  @Enum(RoleEnum)
  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.User,
  })
  role: RoleEnum;

  @Property()
  @Required()
  @Column()
  firstName: string;

  @Property()
  @Required()
  @Column()
  lastName: string;

  @Property()
  @Required()
  @Column({ default: false })
  activated: boolean;

  @Required()
  @Enum(GenderEnum)
  @Column({
    type: 'enum',
    enum: GenderEnum,
  })
  gender: GenderEnum;

  @Property()
  @OneToOne(() => Image, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  avatar: Image;

  @OneToOne(() => AccountConfirmationToken, accountConfirmationToken => accountConfirmationToken.user, {
    cascade: true,
  })
  accountConfirmationToken: AccountConfirmationToken;

  @OneToOne(() => PasswordResetToken, passwordResetToken => passwordResetToken.user, {
    cascade: true,
  })
  passwordResetToken: PasswordResetToken;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  isPassword(password: string) {
    return bcrypt.compareSync(password, this.password)
  }
}
