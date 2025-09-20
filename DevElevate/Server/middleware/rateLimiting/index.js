import createLimiter from './createLimiter.js'
import config from '../../config/rateLimiting.js'


export const guestLimiter = createLimiter(config.guest)();

export const authLimiter = createLimiter(config.auth)();

export const userLimiter = createLimiter(config.user)((req) => req.user.id || req.ip);