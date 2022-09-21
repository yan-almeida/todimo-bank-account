import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { UserDto } from '../user/dto/user.dto';
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
  login(@Body() authDto: AuthDto): Promise<string> {
    return this.authService.login(authDto);
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async profile(@User() { id: userId }: Express.User): Promise<UserDto> {
    const user = await this.authService.profile(userId);

    return UserDto.from(user);
  }
}
