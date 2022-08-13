import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';




const mongoProviders = [
  {
    provide: 'MONGO_CONNECTION',
    useFactory: (configService: ConfigService) =>{
      const options = {
        uri: configService.get<string>('MONGO_URL'),
        pass: configService.get<string>('MONGO_PASSWORD'),
        user: configService.get<string>('MONGO_USER'),
        replicaSet: false,
        retryWrites: false,
        autoIndex: true,
      };
      return mongoose.connect(options.uri, {
        pass: options.pass,
        user: options.user,
        autoIndex: true,
        connectTimeoutMS: 1000 * 60 * 3
      })
    },
    imports: [ConfigModule],
    inject: [ConfigService]
  },
]

@Global()
@Module({
  imports: [ConfigModule],
  providers: [...mongoProviders],
  exports: [...mongoProviders],
})
export class MongoModule {}