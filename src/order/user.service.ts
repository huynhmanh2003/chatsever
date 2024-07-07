import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { UserDTO } from './dto/user.dto';
import { UpdateUserInput } from './dto/userUpdate.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(userData: UserDTO): Promise<User> {
    const user = new this.userModel({
      ...userData,
    });
    return user.save();
  }

  async updateUser(userData: UpdateUserInput, userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userModel
      .findByIdAndUpdate(userId, userData, { new: true })
      .exec();
    return this.findOne(userId);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ name: email }).exec();
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
