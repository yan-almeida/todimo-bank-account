import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tb_bank_account') // tabela no banco de dados
export class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    scale: 2,
  })
  balance: number;

  @Column({
    name: 'account_number',
    length: 50,
    // unique: true,
  })
  accountNumber: string; // coluna: account_number, tamanho max. 50. varchar(50)

  @ManyToOne(() => User) // há a possibilidade de utilizar efeitos em cascata, ou configs. adicionais
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
