import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RefreshToken } from './RefreshToken.entity';

type AccessTokenProps = { [K in keyof AccessToken]?: AccessToken[K] };

@Entity()
export class AccessToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  revoked: boolean;

  @Column({ nullable: false })
  userId: string;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.accessToken)
  refreshToken: RefreshToken;

  constructor(props: AccessTokenProps = {}) {
    for (const [key, value] of Object.entries(props)) {
      this[key] = value;
    }
  }
}
