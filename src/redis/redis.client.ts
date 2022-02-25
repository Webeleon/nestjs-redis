import { createClient } from "redis";

export const REDIS_CLIENT = "RedisClient";
export type RedisClient = ReturnType<typeof createClient>;
