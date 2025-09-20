import { RateLimiterMemory } from 'rate-limiter-flexible';

function createLimiter(options) {

    const rateLimiter = new RateLimiterMemory({
        points: options.points,
        duration: options.duration
    })



    return (keyExtractor = (req) => req.ip) => {
        return (req, res, next) => {
            const key = keyExtractor(req);

            rateLimiter.consume(key).then(() => next()).catch(() => {
                console.warn(`[RateLimit] Blocked: ${key} on ${req.originalUrl}`);
                res.status(429).json({ message: "Too many requests, please try again later." });
            })
        }
    }

}

export default createLimiter;