import Redis from 'ioredis'
import { promisify } from 'util'
import * as dotenv from 'dotenv'
dotenv.config()

const env: any = {
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD
}

Object.entries(env).forEach(([key, value]) => {
  if (value === 'true' || value === 'false') {
    env[key] = JSON.parse(value.toLowerCase())
  }
})

const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD
})

const getAsync = promisify(redis.get).bind(redis)
const setAsync = promisify(redis.set).bind(redis)

export { redis, getAsync, setAsync }
