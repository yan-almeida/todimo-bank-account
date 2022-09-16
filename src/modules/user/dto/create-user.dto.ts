import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ maxLength: 255 })
  @MaxLength(255, {
    message: 'O nome do usuário deve conter, no máximo, 255 caracteres.',
  })
  @IsString({
    message: 'O nome do usuário deve ser uma string.',
  })
  name: string;

  @ApiProperty({ maxLength: 200 })
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
