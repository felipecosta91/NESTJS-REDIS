import { User } from '@prisma/client';
export abstract class UserRepository {
  abstract findMany(): Promise<User[]>;
}
