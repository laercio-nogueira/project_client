import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

const isTest = process.env.NODE_ENV === 'test'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ nullable: false, type: 'varchar' })
  name: string

  @Column({ type: 'float' })
  salary: number

  @Column({ type: 'float' })
  enterprise: number

  @Column({
    nullable: false,
    type: isTest ? 'datetime' : 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date
}
