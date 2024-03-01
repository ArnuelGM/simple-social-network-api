import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Post } from 'src/posts/entities/post';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @ApiProperty({ description: 'Full name of user' })
  @Column()
  fullName: string;

  @ApiProperty()
  @Column({ nullable: true })
  age: string;

  @ApiProperty()
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;

  async createPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async validatePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
