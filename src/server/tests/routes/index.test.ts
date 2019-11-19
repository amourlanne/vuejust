import request from 'supertest';
import index from '../../src/server';

describe('security.ts', () => {
  it('should get message for GET /api', done => {
    return request(index)
      .get('/api')
      .expect(200, done);
  });
});
