import request from 'supertest';
import index from '../src/server';

describe('security.ts', () => {
  it('should redirect to /api for GET /', done => {
    return request(index)
      .get('/')
      .expect('Location', '/api')
      .expect(302, done);
  });
});
