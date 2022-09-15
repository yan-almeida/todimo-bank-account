import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { v4 as uuid } from 'uuid';

export class FilterBankAccountDto {
  @ApiPropertyOptional({
    type: 'uuid',
    description: 'Código identificador da conta.',
    example: uuid(),
  })
  @IsOptional()
  @IsUUID('4', { message: 'Identificador único do usuário é esperado.' })
  userId?: string;
}
