/* Desc: Middleware to limit repeated requests  */
import rateLimit from 'express-rate-limit';
import { logger } from '../utils/logger';

/**
 * Middleware to limit repeated requests to public APIs using `express-rate-limit`.

 *
 * @property {number} windowMs - Time window in milliseconds (15 minutes).
 * @property {number} max - Max requests per IP per windowMs (100,000).
 * @property {boolean} standardHeaders - Include rate limit info in `RateLimit-*` headers.
 * @property {boolean} legacyHeaders - Include rate limit info in `X-RateLimit-*` headers.
 * @property {function} handler - Custom handler for exceeded rate limit.
 *
 */
export const rateLimiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100000,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      message: 'Too many requests, please try again later.',
    });
  },
});
