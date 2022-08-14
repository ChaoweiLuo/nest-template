import { Connection } from "mongoose";
import { UserSchema } from "./entities/user.entity";

export default [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('user', UserSchema),
    inject: ['MONGO_CONNECTION'],
  },
];