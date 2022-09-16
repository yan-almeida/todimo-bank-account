import { UniqueIdentifierEntity } from 'src/common/entities/unique-identifier.entity';
import { BankAccount } from 'src/modules/bank-account/entities/bank-account.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('tb_user')
export class User extends UniqueIdentifierEntity {
  @Column({ length: '255' })
  name: string;

  @Column({ length: '200' })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => BankAccount, () => User)
  bankAccounts: BankAccount[];
}
