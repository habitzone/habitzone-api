import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user1' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 123456 })
  @IsNotEmpty()
  password: string;
}
