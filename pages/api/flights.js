import nc from "next-connect";
import * as rateLimit from "express-rate-limit";

const handler = nc().use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 3,
    message: "You have exceeded the 10 requests in 15 minutes limit!",
    headers: true,
  })
);

export default handler;
