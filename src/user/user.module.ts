import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import userProviders from './user.providers';
import { MongoModule } from 'src/providers/mongo.module';

@Module({
  imports: [MongoModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders]
})
export class UserModule {}
