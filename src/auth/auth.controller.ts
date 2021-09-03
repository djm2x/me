import { User } from 'src/user/user.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService, private jwtService: JwtService) { }

  @Post('/login')
  async login(@Body() model: { email: string, password: string }) {

    const user = await this.service.createQueryBuilder('e')
      .where("e.email = :email", { email: model.email })
      .getOne()
      ;

    if (!user) {
      return { code: -1, message: 'wrong email' };
    }

    if (user.email !== model.email) {
      return { code: -1, message: 'wrong password' };
    }

    if (!user.isActive) {
      return { code: 0, message: 'user not activated' };
    }

    const payload = { username: user.username, sub: user.id, role: user.role };

    return { code: 1, user, token: this.jwtService.sign(payload), messsage: 'ok' }
  }

  @Get('/register')
  async register(@Body() model: User) {
    const user = await this.service.createQueryBuilder('e')
      .where("e.email = :email", { email: model.email })
      .getOne()
      ;

    if (user) {
      return { code: -1, message: 'email taken' };
    }

    try {
      await this.service.save(model)
    } catch (e) {
      return { code: 0, message: (e as Error).message };
    }

    return { code: 1, message: 'ok' };
  }
}
