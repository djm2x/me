import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([AuthService]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY || 'somethingyouwantwhichissecurewillworkk',
      signOptions: {
        expiresIn: process.env.EXPIRESIN || '365d',
      },
    }),
  ],
})
export class AuthModule {}
