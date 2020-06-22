import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/User'

@Entity('send_kudos')
class SendKudo {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_received_kudo_id' })
  received_user: User

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_gave_kudo_id' })
  gave_user: User

  @Column()
  type: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default SendKudo
