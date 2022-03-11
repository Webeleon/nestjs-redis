import { Inject } from "@nestjs/common";
import { REDIS_CLIENT } from "./redis.client";

export const InjectRedisClient = () => Inject(REDIS_CLIENT);
