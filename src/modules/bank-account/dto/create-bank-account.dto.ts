import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateBankAccountDto {
  @ApiProperty({
    example: 15.55,
    description: 'Saldo da conta',
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Saldo deve ser um número' })
  balance: number;

  @ApiProperty({
    maxLength: 50,
    example: '548891-01',
    description: 'Número da conta',
  })
  @MaxLength(50, {
    message: 'Número da conta deve conter, no máximo, 50 caracteres.',
  })
  @IsString({
    message: 'Número da contar deve ser uma string.',
  })
  accountNumber: string;
}
