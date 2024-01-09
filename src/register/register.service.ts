import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { RegisterRepositories } from './register.repositories';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RegisterService {
  ROUND: number = 10;

  constructor(
    private readonly registerRepositories: RegisterRepositories,
    private readonly jwt: JwtService,
  ) {}

  async create(body: CreateUserDto) {
    const hashPassword = await bcrypt.hash(body.password, this.ROUND);
    await this.registerRepositories.create(body.email, hashPassword);
  }

  async loginUser(body: CreateUserDto) {
    const user = await this.registerRepositories.findByEmail(body.email);
    if (!user) throw new NotFoundException();
    const isValid = await bcrypt.compare(body.password, user.password);
    if (!isValid) throw new UnauthorizedException('invalid informations');
    return {
      token: await this.jwt.sign({ userId: user.id, email: user.email }),
    };
  }
}
