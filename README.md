# Webeleon npm package starter

## Install

```bash
npm i @webeleon/nestjs-redis
```

## Configuration in the root module
### with forRoot

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@webeleon/nestjs-redis';
import { redisConfig } from './configurations/redis.config';

@Module({
  imports: [
    RedisModule.forRoot({
      url: 'redis://localhost:6379',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### with forRootAsync

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@webeleon/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisConfig } from './configurations/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [redisConfig],
    }),
    RedisModule.forRootAsync({
      useFactory: async (configService) => configService.get('redis'), 
      inject: [ConfigService]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Usage

Import the `RedisModule.forFeature()` inside a feature module.
```ts
import { RedisModule } from './redis.module';

@Module({
  imports: [
    RedisModule.forFeature()
  ]
})
class SomeModule {}
```

Then you'll be able to inject the RedisClient inside any provider.
```ts
import { Injectable } from '@nestjs/common';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';

@Injectable()
export class SomeService {
  constructor(
    @InjectRedisClient() redisClient: RedisClient
  ) {}
}
```

## Developers
### Generate the documentation

```bash
npm run generate-doc
```
