import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AccessToken } from './AccessToken.entity';

// Estatico
/* interface RefreshTokenProps {
  id?: string;
  revoked?: boolean;
  accessToken?: AccessToken;
  userId?: string;
} */

// Dinamico
type RefreshTokenProps = { [K in keyof RefreshToken]?: RefreshToken[K] };

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  revoked: boolean;

  @OneToOne(() => AccessToken, (accessToken) => accessToken.refreshToken)
  @JoinColumn()
  accessToken: AccessToken;

  @Column({ nullable: false })
  userId: string;

  constructor(props: RefreshTokenProps = {}) {
    for (const [key, value] of Object.entries(props)) {
      this[key] = value;
    }
  }
}
