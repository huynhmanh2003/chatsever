/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from './types/user.type';
import { UserDTO } from './dto/user.dto';
import { UpdateUserInput } from './dto/userUpdate.dto';
import { query } from 'express';
import { MessageType } from './types/message.type';
import { createMessageInput } from './dto/message.dto';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(private UserService: UserService) {}
  @Query((returns) => [UserType]) //Get//
  findAll() {
    return this.UserService.findAll();
  }

  @Query((returns) => UserType)
  async findOne(@Args('userId') userId: string) {
    return await this.UserService.findOne(userId);
  }

  @Mutation((returns) => UserType)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.UserService.validateUser(email, password);
  }

  @Mutation((returns) => UserType) //update data//
  async createUser(@Args('userData') userData: UserDTO) {
    const createdOrder = await this.UserService.createUser(userData);
    return createdOrder;
  }

  @Mutation((returns) => UserType) //update data//
  async UpdateUser(
    @Args('userData') userData: UpdateUserInput,
    @Args('userId') userId: string,
  ) {
    const updatedOrder = await this.UserService.updateUser(userData, userId);
    return updatedOrder;
  }
}
