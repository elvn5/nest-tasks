import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
    const { username, password } = dto;

    const salt = await genSalt();
    const hashedPass = await hash(password, salt);

    const user = this.usersRepository.create({
      username,
      password: hashedPass,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signin(dto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = dto;

    const user = await this.usersRepository.findOne({ where: { username } });

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
