import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../entities/user.entity';
import { UserService } from '../service/user.service';
import { UserResolver } from '../resolver/user.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService, MongooseModule], // Export UserService and MongooseModule
})
export class UserModule {}
