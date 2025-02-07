import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  private usersRepository: UsersRepository;
  constructor(private dataSource: DataSource) {
    this.usersRepository = this.dataSource.getRepository(User);
  }

  async createUser(dto: AuthCredentialsDto) {
    const { username, password } = dto;

    const user = this.usersRepository.create({
      username,
      password,
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
}
