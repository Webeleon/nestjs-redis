export const REDIS_OPTIONS = "redis-options";

export interface RedisConnectionOptions {
  url: string;
}

export interface RedisModuleAsyncOptions {
  inject: any[];
  useFactory: (
    ...args: any[]
  ) => Promise<RedisConnectionOptions> | RedisConnectionOptions;
}
