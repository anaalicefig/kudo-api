import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Expose, Exclude } from 'class-transformer'

import uploadConfig from '@config/upload'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  @Exclude()
  password: string

  @Column()
  avatar_url: string

  @Column()
  learned: number

  @Column()
  was_awesome: number

  @Column()
  grateful: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'avatar_public_url' })
  getAvatarPublicUrl(): string | null {
    if (!this.avatar_url) {
      return null
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.API_URL}/files/${this.avatar_url}`
      case 's3':
        return `https://api-kudo.s3.amazonaws.com/${this.avatar_url}`
      default:
        return null
    }
  }
}

export default User
