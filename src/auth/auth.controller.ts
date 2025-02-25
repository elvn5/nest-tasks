import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  createUser(@Body() dto: AuthCredentialsDto): Promise<void> {
    return this.authService.createUser(dto);
  }

  @Post('/signin')
  signIn(@Body() dto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signin(dto);
  }
}
