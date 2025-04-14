import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  email: string;

  @MinLength(4)
  @MaxLength(20)
  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @ApiProperty()
  password: string;
}

export class SignInResponseDto {
  @IsString()
  @ApiProperty()
  accessToken: string;
}
