import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chatroom } from './entities/chatRoom.entity';
import { CreateChatRoomInput } from './dto/chatroom.dto';
import { User } from './entities/user.entity';

@Injectable()
export class ChatroomService {
  constructor(
    @InjectModel(Chatroom.name) private chatroomModel: Model<Chatroom>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createChatRoom(input: CreateChatRoomInput): Promise<Chatroom> {
    const { userFrom, userTo } = input;

    // Fetch users from the database
    const fromUser = await this.userModel.findById(userFrom);
    const toUser = await this.userModel.findById(userTo);

    if (!fromUser || !toUser) {
      throw new NotFoundException('One or both users not found');
    }

    // Create new Chatroom
    const newChatRoom = new this.chatroomModel({
      users: [fromUser._id, toUser._id],
    });

    return newChatRoom.save();
  }

  async findAll(): Promise<Chatroom[]> {
    return this.chatroomModel
      .find()
      .populate('users')
      .populate('messages')
      .exec();
  }
}
