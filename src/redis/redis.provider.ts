import { Inject, Injectable, Logger } from "@nestjs/common";
import { REDIS_OPTIONS, RedisConnectionOptions } from "./redis.config";
import { createClient } from "redis";
import { REDIS_CLIENT, RedisClient } from "./redis.client";

@Injectable()
export class RedisProvider {
  client: RedisClient;

  constructor(
    @Inject(REDIS_OPTIONS) private readonly options: RedisConnectionOptions
  ) {}

  async getClient(): Promise<RedisClient> {
    if (this.client) return this.client;
    this.client = createClient(this.options);

    this.client.on("error", (error) => {
      Logger.error(error.message, error.stack, REDIS_CLIENT);
    });
    this.client.on("connect", () => {
      Logger.log("client connected", REDIS_CLIENT);
    });

    await this.client.connect();

    return this.client;
  }
}
