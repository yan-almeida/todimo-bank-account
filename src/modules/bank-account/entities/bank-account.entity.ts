import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  })
  accountNumber: string; // coluna: account_number, tamanho max. 50. varchar(50)
}
