import { UserService } from './../user/user.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AccessToken } from './entities/AccessToken.entity';
import { RefreshToken } from './entities/RefreshToken.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(AccessToken)
    private accessTokenRepository: Repository<AccessToken>,

    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,

    private jwtService: JwtService,
    private userService: UserService,
    private eventEmitter: EventEmitter2,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const { password, ...userData } = user;
      if (await user.validatePassword(pass)) return userData;
    }
    return null;
  }

  async register(userDto: UserDto) {
    const { password, passwordConfirmation } = userDto;
    if (password != passwordConfirmation) {
      throw new BadRequestException('Passwords must be equals.');
    }

    const { email } = userDto;
    const userExists = await this.userRepository.findOneBy({ email });
    if (userExists) {
      throw new ConflictException(`User with email ${email} already exists.`);
    }

    const user = new User();
    Object.assign(user, userDto);
    user.password = await user.createPassword(userDto.password);
    const registeredUser = await this.userRepository.save(user);

    // Emit event in order to send welcome email and more.
    this.eventEmitter.emitAsync('auth.registered', user);

    return registeredUser;
  }

  async login(user: User) {
    const { access_token, refresh_token } = await this.createTokens(user);
    return { access_token, refresh_token };
  }

  async logout(token: string) {
    const data = this.jwtService.decode(token);
    const { tokenId } = data;
    const accessToken = await this.getAccessToken(tokenId);
    await this.revokeTokens(accessToken);
  }

  async getAccessToken(tokenId: string) {
    return await this.accessTokenRepository.findOne({
      where: {
        id: tokenId,
      },
      relations: {
        refreshToken: true,
      },
    });
  }

  async getRefreshToken(tokenId: string) {
    return await this.refreshTokenRepository.findOne({
      where: {
        id: tokenId,
      },
      relations: {
        accessToken: true,
      },
    });
  }

  async createTokens(user: User) {
    const token = await this.accessTokenRepository.save(
      new AccessToken({
        revoked: false,
        userId: user.id,
      }),
    );
    const refreshToken = await this.refreshTokenRepository.save(
      new RefreshToken({
        revoked: false,
        userId: user.id,
        accessToken: token,
      }),
    );

    const payload = { email: user.email, sub: user.id, tokenId: token.id };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(
      {
        ...payload,
        refreshTokenId: refreshToken.id,
        tokenId: undefined,
      },
      { expiresIn: '7d' },
    );

    return {
      access_token,
      refresh_token,
    };
  }

  async revokeTokens(accessToken: AccessToken) {
    const refreshToken = await this.getRefreshToken(
      accessToken.refreshToken.id,
    );

    accessToken.revoked = true;
    refreshToken.revoked = true;

    await Promise.allSettled([
      await this.accessTokenRepository.save(accessToken),
      await this.refreshTokenRepository.save(refreshToken),
    ]);
  }
}
