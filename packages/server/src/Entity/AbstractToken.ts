import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { MaxLength, MinLength, Required } from '@tsed/common';
import moment, { DurationInputArg1 } from 'moment';

import TokenGenerator from "uuid-token-generator";
import DurationConstructor = moment.unitOfTime.DurationConstructor;

@Unique(['value'])
export abstract class AbstractToken {

  protected expiredAtAmount: DurationInputArg1;
  protected expiredAtUnit: DurationConstructor;

  constructor(expiredAtAmount = "0", expiredAtUnit = "days") {
    this.generateToken();
    this.expiredAtAmount = expiredAtAmount;
    this.expiredAtUnit = <DurationConstructor> expiredAtUnit;

    this.generateExpiredAt();
  }

  @Required()
  @PrimaryGeneratedColumn()
  id: number;

  @MaxLength(32)
  @MinLength(32)
  @Required()
  @Column()
  value: string;

  @Required()
  @Column({
    default: false
  })
  used: boolean;

  @Required()
  @Column()
  expiredAt: Date;

  protected generateToken() {
    this.value = new TokenGenerator(TokenGenerator.BASE16).generate();
  }

  protected generateExpiredAt() {
    this.expiredAt = moment().add(this.expiredAtAmount, this.expiredAtUnit).toDate();
  }

  public refresh() {
    this.generateToken();
    this.generateExpiredAt();
    this.used = false;
  }
}
