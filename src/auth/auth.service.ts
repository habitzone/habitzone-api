import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    const isPasswordMatching = await this.verifyPassword(
      password,
      user?.password,
    );
    if (user && isPasswordMatching) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string | undefined,
  ): Promise<boolean> {
    if (hashedPassword === undefined) {
      return false;
    }
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
