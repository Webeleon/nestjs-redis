export const REDIS_OPTIONS = "redis-options";

export interface RedisConnectionOptions {
  url: string;
}

export interface RedisModuleAsyncOptions {
  imports?: any[];
  inject?: any[];
  useFactory: (
    ...args: any[]
  ) => Promise<RedisConnectionOptions> | RedisConnectionOptions;
}
