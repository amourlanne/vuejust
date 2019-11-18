import request from 'supertest';
import server from '../../src/server';

describe('security.ts', () => {
  it('should get message for GET /api', done => {
    return request(server)
      .get('/api')
      .expect(200, done);
  });
});
