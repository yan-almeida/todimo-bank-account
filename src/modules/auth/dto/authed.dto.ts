import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { v4 as uuid } from 'uuid';

export class AuthedDto {
  @ApiProperty({
    type: 'uuid',
    description: 'Código identificador do usuário.',
    example: uuid(),
  })
  userId: string;

  @ApiProperty({
    description: 'Token de acesso do usuário.',
  })
  token: string;

  static toDto(token: string, user: User): AuthedDto {
    return {
      token,
      userId: user.id,
    };
  }
}
