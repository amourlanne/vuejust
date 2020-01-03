import request from 'supertest';
import index from '../../src/server';

describe('security.ts', () => {
  it('should get users for GET /api/users', done => {
    return request(index)
      .get('/api/users')
      .expect(200, done);
  });
});
