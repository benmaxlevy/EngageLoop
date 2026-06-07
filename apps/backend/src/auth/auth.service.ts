import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser(
    username: string,
    pass: string,
  ): { id: number; username: string; role: string } {
    const isProduction = process.env.NODE_ENV === 'production';
    const allowedUsername =
      process.env.AUTH_DEV_USERNAME ?? (isProduction ? undefined : 'admin');
    const allowedPassword =
      process.env.AUTH_DEV_PASSWORD ?? (isProduction ? undefined : 'password');

    if (
      allowedUsername &&
      allowedPassword &&
      username === allowedUsername &&
      pass === allowedPassword
    ) {
      return { id: 1, username: allowedUsername, role: 'administrator' };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
