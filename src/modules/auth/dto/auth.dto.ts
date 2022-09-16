import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    maxLength: 200,
    description: 'Login do usuário - utilizamos o email.',
  })
  @MaxLength(200, {
    message: 'O email do usuário deve conter, no máximo, 200 caracteres.',
  })
  @IsEmail({}, { message: 'Email do usuário não é válido.' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário.',
  })
  password: string;
}
