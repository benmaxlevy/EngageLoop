import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser(
    username: string,
    pass: string,
  ): { id: number; username: string; role: string } {
    if (username === 'admin' && pass === 'password') {
      return { id: 1, username: 'admin', role: 'administrator' };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
