import _ from 'lodash';
import md5 from 'md5';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Comment} from './Comment';
import {Post} from './Post';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  username: string;
  @Column('varchar')
  passwordDigest: string;
  @CreateDateColumn({type: 'timestamp', name: 'createdAt', nullable: false})
  createdAt: Date;
  @UpdateDateColumn({type: 'timestamp', name: 'updatedAt'})
  updatedAt: Date;
  @OneToMany('Post', 'author')
  posts: Post[];
  @OneToMany('Comment', 'user')
  comments: Comment[];
  errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[],
  };
  passwordConfirmation: string;
  password: string;
  async validate() {
    const useName = this.username.trim();
    if (useName === '') {
      this.errors.username.push('不能为空');
    }
    if (!/[a-zA-z0-9]/.test(useName)) {
      this.errors.username.push('格式错误');
    }
    if (useName.length > 42) {
      this.errors.username.push('超过最大长度');
    }
    if (useName.length <= 3) {
      this.errors.username.push('低于最小长度');
    }
    if (this.password === '') {
      this.errors.password.push('不能为空');
    }
    const regex = new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}');
    if (!regex.test(this.password)) {
      this.errors.password.push('密码必须包含大写字母和小写、数字、特殊字符,长度最小为8');
    }
    if (this.passwordConfirmation !== this.password) {
      this.errors.passwordConfirmation.push('两次密码不一致');
    }
  }
  hasErrors() {
    return !!Object.values(this.errors).find((v) => v.length > 0);
  }

  @BeforeInsert()
  generatePasswordDigest() {
    this.passwordDigest = md5(this.password) as string;
  }
  toJSON() {
    return _.omit(this, ['password', 'errors', 'passwordDigest', 'passwordConfirmation']);
  }
}
