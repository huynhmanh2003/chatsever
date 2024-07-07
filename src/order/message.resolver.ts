import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { MessageType } from './types/message.type';
import { createMessageInput } from './dto/message.dto';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => MessageType)
export class MessageResolver {
  constructor(private messageService: MessageService) {}

  @Mutation(() => MessageType)
  async createMessage(@Args('messageData') messageData: createMessageInput) {
    return this.messageService.createMessage(messageData);
  }

  @Subscription(() => MessageType, {
    filter: (payload, variables) => {
      return payload.messageAdded.userTo.id === variables.userTo;
    },
  })
  messageAdded(@Args('userTo') userTo: string) {
    return this.messageService.getPubSub().asyncIterator('messageAdded');
  }
}
