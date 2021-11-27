import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { SuperController } from 'src/shared/super.controller';
import { User } from './user.entity';
import { Roles } from 'src/shared/roles.decorator';

@Roles('admin')
@Controller('users')
export class UserController extends SuperController<User> {

  constructor(protected service: UserService) {
    super(service);
  }
  

  @Get('/getAll/:startIndex/:pageSize/:sortBy/:sortDir/:username/:email/:role')
  async getAll(@Param('startIndex') startIndex, @Param('pageSize') pageSize
  , @Param('sortBy') sortBy, @Param('sortDir') sortDir
  , @Param('username') username, @Param('email') email, @Param('role') role
  ) {

    const [list, count] = await this.service.createQueryBuilder('e')
      .where(username === '*' ? 'TRUE' : 'username LIKE :username', {username: `%${username}%`})
      .andWhere(email === '*' ? 'TRUE' : 'email LIKE :email', {email: `%${email}%`})
      .andWhere(role === '*' ? 'TRUE' : 'role LIKE :role', {role: `%${role}%`})
      .orderBy(sortBy, sortDir.toUpperCase())
      .skip(startIndex)
      .take(pageSize)
      .getManyAndCount()
      ;

    return {list, count};
  }
}
