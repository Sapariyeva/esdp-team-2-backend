import request from 'supertest';
import app from '../index';
describe('cities', () => {
  test('GET /cities endpoint', async () => {
    const response = await request(app.app).get('/cities');

    expect(response.status).toBe(200);

    expect(response.header['content-type']).toEqual(expect.stringContaining('application/json'));

    expect(Array.isArray(response.body)).toBeTruthy();

    if (response.body.length > 0) {
      const firstCity = response.body[0];

      expect(firstCity).toHaveProperty('id');
      expect(firstCity).toHaveProperty('name');
      expect(firstCity).toHaveProperty('country');

      expect(typeof firstCity.id).toBe('number');
      expect(typeof firstCity.name).toBe('string');
      expect(typeof firstCity.country).toBe('string');
    }
  });
});
