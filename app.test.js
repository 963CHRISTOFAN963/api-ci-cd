const request = require('supertest');
const app = require('./app');

test('GET / retorna mensagem', async () => {
  const response = await request(app).get('/');
  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe("API funcionando 🚀");
});

test('GET /frutas retorna lista de frutas', async () => {
  const response = await request(app).get('/frutas');
  expect(response.statusCode).toBe(200);
  expect(response.body.frutas).toEqual(expect.arrayContaining(["maçã", "banana", "laranja"]));
});

test('POST /frutas adiciona uma fruta', async () => {
  const response = await request(app)
    .post('/frutas')
    .send({ nome: "abacaxi" });
  expect(response.statusCode).toBe(201);
  expect(response.body.frutas).toContain("abacaxi");
});
