import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { PublicRoute } from 'src/common/decorators/public-route.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { AsyncPipeline } from 'src/common/utils/async-pipeline.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    type: UserDto,
    description: 'Criação de usuário.',
  })
  @ApiConflictResponse({
    description: 'Usuário já cadastrado.',
  })
  @ApiBadRequestResponse({ description: 'Erro de validação ao criar usuário.' })
  @PublicRoute()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.create(createUserDto);

    return UserDto.from(user);
  }

  @Get()
  @ApiOkResponse({
    description: 'Usuários buscados.',
    type: [UserDto],
  })
  @ApiBearerAuth()
  async findAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll();

    return users.map(UserDto.from);
  }

  // @Get()
  // @ApiOkResponse({
  //   description: 'Usuário buscado pelo ID.',
  //   type: UserDto,
  // })
  // @ApiNotFoundResponse({ description: 'Usuário buscado não foi encontrado.' })
  // @ApiBearerAuth()
  // async findOne(@User() { id }: Express.User): Promise<UserDto> {
  //   const user = await this.userService.findOne(id);

  //   return UserDto.from(user);
  // }

  @Patch()
  @ApiOkResponse({
    description: 'Usuários buscados.',
    type: [UserDto],
  })
  @ApiConflictResponse({
    description: 'Usuário já cadastrado.',
  })
  @ApiBadRequestResponse({ description: 'Erro de validação ao criar usuário.' })
  @ApiBearerAuth()
  async update(
    @User() { id }: Express.User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.userService.update(id, updateUserDto);

    return UserDto.from(user);
  }

  @Delete()
  @ApiNoContentResponse({
    description: 'Usuário removido com sucesso.',
  })
  @ApiBadRequestResponse({ description: 'Erro de validação no ID do usuário.' })
  @ApiNotFoundResponse({
    description: 'Usuário a ser remover não foi encontrado.',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@User() { id }: Express.User): Promise<void> {
    return this.userService.remove(id);
  }

  @Get('export')
  @Header('Content-type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="users.csv"')
  @PublicRoute()
  async exportUsers(@Res() response: Response): Promise<void> {
    const { readable, mapToCsv, setHeader } = await this.userService.export();

    await AsyncPipeline(readable, mapToCsv, setHeader, response);
  }
}
