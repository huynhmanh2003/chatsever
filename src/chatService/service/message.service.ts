import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../entities/message.entity';
import { User } from '../entities/user.entity';
import { Chatroom } from '../entities/chatRoom.entity';
import { createMessageInput } from '../dto/message.dto';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class MessageService {
  private pubSub: PubSub;

  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(User.name) private userModel: Model<User>, // Ensure UserModel is injected correctly
    @InjectModel(Chatroom.name) private chatroomModel: Model<Chatroom>,
  ) {
    this.pubSub = new PubSub();
  }

  async createMessage(input: createMessageInput): Promise<Message> {
    const { userFrom, userTo, content } = input;

    const fromUser = await this.userModel.findById(userFrom);
    const toUser = await this.userModel.findById(userTo);

    if (!fromUser || !toUser) {
      throw new NotFoundException('User not found');
    }

    const chatRoomExist1 = await this.chatroomModel.findOne({
      users: { $all: [fromUser._id, toUser._id] },
    });

    const newMessage = new this.messageModel({
      content,
      userFrom: fromUser._id,
      userTo: toUser._id,
      isSeen: false,
    });

    if (!chatRoomExist1) {
      const chatRoom = new this.chatroomModel({
        users: [fromUser._id, toUser._id],
        messages: [newMessage._id],
      });

      const saveChatRoom = await chatRoom.save();

      newMessage.chatroom = saveChatRoom._id;
    } else {
      newMessage.chatroom = chatRoomExist1._id;
    }

    const savedMessage = await newMessage.save();
    if (chatRoomExist1) {
      chatRoomExist1.messages.push(savedMessage._id);
      await chatRoomExist1.save();
    }

    this.pubSub.publish('messageAdded', { messageAdded: savedMessage });

    return savedMessage;
  }

  getPubSub() {
    return this.pubSub;
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  // Hàm seenMessage sẽ cần được hoàn thiện thêm tùy thuộc vào yêu cầu
  // async seenMessage(seenInput: SeenMessageDTO): Promise<Message[]> {
  //   const userFrom = this.userRepository.findOneBy({ id: seenInput.UserFrom });
  //   if (!user) throw new NotFoundException('User Not Found');
  //   const userTo = this.messageRepository.findOneBy({ id: seenInput.UserTo });
  //   if (!message) throw new NotFoundException('Message Not Found');
  // }
}
