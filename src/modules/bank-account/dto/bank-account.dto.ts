import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';
import { BankAccount } from '../entities/bank-account.entity';

export class BankAccountDto {
  @ApiProperty({
    type: 'uuid',
    description: 'Código identificador da conta.',
    example: uuid(),
  })
  id: string;

  @ApiProperty({
    maxLength: 50,
    example: '548891-01',
    description: 'Número da conta',
  })
  accountNumber: string;

  // @ApiPropertyOptional({
  //   type: 'uuid',
  //   description: 'Código identificador da conta.',
  //   example: uuid(),
  // })
  // userId?: string;

  static toDto(bankAccount: BankAccount): BankAccountDto {
    return {
      id: bankAccount.id,
      accountNumber: bankAccount.accountNumber,
      // userId: bankAccount?.user?.id,
    };
  }
}
