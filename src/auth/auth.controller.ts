import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  createUser(@Body() dto: AuthCredentialsDto): Promise<void> {
    return this.authService.createUser(dto);
  }
}
