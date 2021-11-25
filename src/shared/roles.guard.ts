import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndMerge<string[]>('roles', [
      context.getClass(),
      context.getHandler(),
    ])

    // const isPublic = this.reflector.getAllAndOverride<boolean>('public', [
    //   context.getHandler(),
    //   context.getClass(), 
    // ]);

    console.log(roles)
    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('roles.guard.ts : ', user.role)
    // console.log(user)

    return roles.some((role) => {
      return role === user.role;
    });
  }
}