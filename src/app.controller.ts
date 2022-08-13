import { Controller, Get, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  @Get()
  async getHello() {
    return await this.redis.get("name");
    return this.appService.getHello();
  }

  @Get("set")
  async setHello() {
    return await this.redis.set("name", "Nestjs");
  }

}
