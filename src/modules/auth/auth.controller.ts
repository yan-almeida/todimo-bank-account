import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthedDto } from './dto/authed.dto';

@Controller('auth')
@ApiTags('Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // auth/login
  @ApiOkResponse({
    description: 'Usuário autenticado com sucesso.',
    type: AuthedDto,
  })
  login(@Body() authDto: AuthDto, request: Request, response: Response) {
    return this.authService.login(authDto);
  }
}
