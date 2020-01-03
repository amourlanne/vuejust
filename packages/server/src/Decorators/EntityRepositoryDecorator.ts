import { EntityRepository as BaseEntityRepository, getCustomRepository } from 'typeorm';
import { registerProvider } from '@tsed/di';
import { applyDecorators, Type } from '@tsed/core';

export function EntityRepository(model: any) {
  return applyDecorators(
    BaseEntityRepository(model),
    (target: Type<any>) => {
      registerProvider({
        provide: target,
        useFactory() {
          return getCustomRepository(target)
        }
      })
    }
  )
}
