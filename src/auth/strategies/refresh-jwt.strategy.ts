import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/entities/user';
import { Repository } from 'typeorm';
import { AuthService } from '../auth.service';
import { AccessToken } from '../entities/AccessToken.entity';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private authService: AuthService,

    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const { refreshTokenId } = payload;
    const refreshToken = await this.authService.getRefreshToken(refreshTokenId);
    if (!refreshToken) return null;
    if (refreshToken.revoked) return null;

    await this.invalidateTokens(refreshToken.accessToken);

    return await this.userRepository.findOneBy({ id: payload.sub });
  }

  async invalidateTokens(token: AccessToken) {
    const accessToken = await this.authService.getAccessToken(token.id);
    await this.authService.revokeTokens(accessToken);
  }
}
