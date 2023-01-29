import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from './../database/postgresErrorCodes.enum';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiTags('register')
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<string> {
    const user = await this.userService.findOneByUsername(
      createUserDto.username,
    );
    if (user !== null) {
      throw new HttpException(
        'This username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    try {
      await this.userService.create({
        ...createUserDto,
        password: hashedPassword,
      });
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'This username already exists (database)',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return 'Successful registration!';
  }
}
