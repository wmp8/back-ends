const server = require('../server')
const request = require('supertest')
const db = require('../data/db-config')

test('[0] Sanity check', () => {
  expect(true).toBe(true)
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

describe('[POST] /api/auth/register', () => {
  test('[1] Register responds if missing username or password', async () => {
    const res = await request(server).post('/api/auth/register')
    expect(res.status).toBe(401)
    expect(res.body.message).toBe('username and password required')
  })
})

describe('[POST] /api/auth/login', () => {
  test('[4] Login responds for missing username or password', async () => {
    const res = await request(server).post('/api/auth/login')
    expect(res.status).toBe(401)
    expect(res.body.message).toBe('username and password required')
  })
  test('[5] Login responds for invalid username or password', async () => {
    const res = await request(server).post('/api/auth/login').send({ username: 'bar', password: 'foo' })
    expect(res.status).toBe(401)
    expect(res.body.message).toBe('invalid credentials')
  })
})

