import { Public } from './../shared/public.decorator';
import { User } from 'src/user/user.entity';
import { Controller, Get, Post, Body, Request, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { Payload } from './payload';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService, private jwtService: JwtService) { }
  
  @Get('profile')
  profile(@Request() req:  Express.Request) {
    return {msg: req.user};
  }

  @Public()
  @Get('/token/:id')
  token(@Param('id') id: number) {
    return {ok: this.jwtService.sign({userId: id})};
  }

  @Public()
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

    const payload: Payload = { username: user.username, id: user.id, role: user.role };

    return { code: 1, user, token: this.jwtService.sign(payload), message: 'ok' }
  }

  @Public()
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
