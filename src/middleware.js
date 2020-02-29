import rateLimit from 'express-rate-limit';

// rate limit middleware. Used for stop brute force attacks
const rateLimitInMs = process.env.RATE_LIMIT_WINDOW || 1 * 60 * 1000;
export const rateLimitMiddleware = rateLimit({
  windowMs: rateLimitInMs,
  max: process.env.RATE_LIMIT || 100,
  statusCode: 429,
  message: { message: `Too many attempts. Please try again in ${rateLimitInMs / 60 / 1000} minutes` },
});
