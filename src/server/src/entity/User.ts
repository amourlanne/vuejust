import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  BeforeInsert, OneToOne, JoinColumn,
} from 'typeorm';
import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Image } from './Image';
import security from '../../config/security';

@Entity('users')
@Unique(['username'])
@Unique(['email'])
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Length(4, 100)
  password: string;

  @Column({
    type: 'enum',
    enum: security.Role,
    default: security.Role.User,
  })
  @IsNotEmpty()
  @IsEnum(security.Role)
  role /*: security.Role*/;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column({ default: false })
  activated: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Image)
  @JoinColumn()
  avatar: Image;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  isAdmin() {
    return this.role === security.Role.Admin;
  }
}
