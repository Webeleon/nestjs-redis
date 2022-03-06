import { DynamicModule, Module, Provider } from "@nestjs/common";
import { RedisProvider } from "./redis.provider";
import {
  REDIS_OPTIONS,
  RedisConnectionOptions,
  RedisModuleAsyncOptions,
} from "./redis.config";
import { REDIS_CLIENT } from "./redis.client";

@Module({})
export class RedisModule {
  public static forRoot(options: RedisConnectionOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        RedisProvider,
        {
          provide: REDIS_OPTIONS,
          useValue: options,
        },
        {
          provide: REDIS_CLIENT,
          useFactory: async (redisProvider: RedisProvider) =>
            await redisProvider.getClient(),
          inject: [RedisProvider],
        },
      ],
      exports: [REDIS_CLIENT],
    };
  }

  public static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      imports: options.imports,
      module: RedisModule,
      providers: [
        RedisProvider,
        this.createConfigProviders(options),
        {
          provide: REDIS_CLIENT,
          useFactory: async (redisProvider: RedisProvider) =>
            await redisProvider.getClient(),
          inject: [RedisProvider],
        },
      ],
      exports: [REDIS_CLIENT],
    };
  }

  public static forFeature(): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        RedisProvider,
        {
          provide: REDIS_CLIENT,
          useFactory: async (redisProvider: RedisProvider) =>
            await redisProvider.getClient(),
          inject: [RedisProvider],
        },
      ],
      exports: [REDIS_CLIENT],
    };
  }

  private static createConfigProviders(
    options: RedisModuleAsyncOptions
  ): Provider {
    return {
      provide: REDIS_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject,
    };
  }
}
