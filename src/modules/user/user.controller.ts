import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
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
  async findAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll();

    return users.map(UserDto.from);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Usuário buscado pelo ID.',
    type: UserDto,
  })
  @ApiNotFoundResponse({ description: 'Usuário buscado não foi encontrado.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
    const user = await this.userService.findOne(id);

    return UserDto.from(user);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Usuários buscados.',
    type: [UserDto],
  })
  @ApiConflictResponse({
    description: 'Usuário já cadastrado.',
  })
  @ApiBadRequestResponse({ description: 'Erro de validação ao criar usuário.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'Usuário removido com sucesso.',
  })
  @ApiBadRequestResponse({ description: 'Erro de validação no ID do usuário.' })
  @ApiNotFoundResponse({
    description: 'Usuário a ser remover não foi encontrado.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
