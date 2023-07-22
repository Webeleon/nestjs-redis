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
  private static _module: DynamicModule;

  public static forRoot(options: RedisConnectionOptions): DynamicModule {
    RedisModule._module = {
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
    return RedisModule._module;
  }

  public static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    RedisModule._module = {
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

    return RedisModule._module;
  }

  public static forFeature(): DynamicModule {
    return RedisModule._module;
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
