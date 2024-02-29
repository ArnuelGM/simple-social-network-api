import { User } from 'src/user/entities/user';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
