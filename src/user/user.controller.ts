import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { SuperController } from 'src/shared/super.controller';
import { User } from './user.entity';

@Controller('users')
export class UserController extends SuperController<User> {

  constructor(protected service: UserService) {
    super(service);
  }
  
}
