import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';
import { User } from '../entities/user.entity';

export class UserDto {
  @ApiProperty({
    type: 'uuid',
    description: 'Código identificador do usuário.',
    example: uuid(),
  })
  id: string;

  @ApiProperty({
    maxLength: 255,
    example: 'Fulano da Silva',
    description: 'Nome do usuário.',
  })
  name: string;

  @ApiProperty({
    maxLength: 200,
    example: 'user@email.com',
    description: 'Email do usuário.',
  })
  email: string;

  static from(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
