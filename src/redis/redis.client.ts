import { createClient } from "redis";

export const REDIS_CLIENT = "RedisClient";
export type RedisClientType = ReturnType<typeof createClient>;
