import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "You have exceeded the 10 requests in 15 minutes limit!",
  headers: true,
});
