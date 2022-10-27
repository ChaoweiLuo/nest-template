import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis'

const redisProviders = [
  {
    provide: Redis,
    useFactory: (configService: ConfigService) =>{
      const path = configService.get("REDIS_URL");
      const db = +configService.get<string>('REDIS_DB') || 0;
      if(path) {
        return new Redis(path, { db });
      }
      let redis = new Redis({
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        password: configService.get<string>('REDIS_PASSWORD'),
        // username: configService.get<string>('REDIS_USER'),
        db: +configService.get<string>('REDIS_DB') || 0,
      });
      return redis;
    },
    imports: [ConfigModule],
    inject: [ConfigService]
  },
]

@Global()
@Module({
  imports: [ConfigModule],
  providers: [...redisProviders],
  exports: [...redisProviders],
})
export class RedisModule {}
