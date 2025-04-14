import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto, SignInResponseDto } from './dto/auth.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto';

@Injectable()
export class AuthService {
  private usersRepository: Repository<User>;
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {
    this.usersRepository = this.dataSource.getRepository(User);
  }

  async createUser(dto: AuthCredentialsDto) {
    const { username, password, email } = dto;

    const salt = await genSalt();
    const hashedPass = await hash(password, salt);

    const user = this.usersRepository.create({
      username,
      password: hashedPass,
      email,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      console.debug(error);
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signin(dto: SignInDto): Promise<SignInResponseDto> {
    const { username, password } = dto;

    const user = await this.usersRepository.findOne({
      where: [{ username }],
    });

    const isCorrectPassword = await compare(password, user?.password || '');

    if (user && isCorrectPassword) {
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Check your credentials');
    }
  }
}
