import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user-repository';
import Redis from 'ioredis';
import { RedisService } from './../../../src/config/redis';
import { PrismaService } from './../../../src/config/prisma';
import { User } from '@prisma/client';

@Injectable()
export class RedisUserRepository implements UserRepository {
  constructor(
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
  ) {}
  async findMany(): Promise<User[]> {
    const cachedUsers = await this.redis.get('users');
    if (!cachedUsers) {
      const users = await this.prisma.user.findMany();
      await this.redis.set('users', JSON.stringify(users), 'EX', 10);
      console.log('db');
      return users;
    }
    console.log('cache');
    return JSON.parse(cachedUsers);
  }
}
