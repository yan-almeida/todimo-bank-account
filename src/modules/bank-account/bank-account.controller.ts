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
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { BankAccountService } from './bank-account.service';
import { BankAccountDto } from './dto/bank-account.dto';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { FilterBankAccountDto } from './dto/filter-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@ApiTags('Bank Account')
@Controller('bank-accounts')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Usuário não está autenticado ou possuí token expirado.',
})
@UseGuards(JwtGuard)
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Conta criada com sucesso.',
    type: BankAccountDto,
  })
  @ApiBadRequestResponse({ description: 'Erro de validação ao criar conta.' })
  @ApiNotFoundResponse({ description: 'Usuário buscado não foi encontrado.' })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createBankAccountDto: CreateBankAccountDto,
    @User() user: Express.User,
  ): Promise<BankAccountDto> {
    const bankAccount = await this.bankAccountService.create(
      user.id,
      createBankAccountDto,
    );

    return BankAccountDto.toDto(bankAccount);
  }

  @Get()
  @ApiOkResponse({
    description: 'Contas buscadas.',
    type: [BankAccountDto],
  })
  async findAll(
    @Query() filterBankAccountDto: FilterBankAccountDto,
  ): Promise<BankAccountDto[]> {
    const bankAccounts = await this.bankAccountService.findAll(
      filterBankAccountDto,
    );

    return bankAccounts.map(BankAccountDto.toDto);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Conta buscada pelo ID.',
    type: BankAccountDto,
  })
  @ApiNotFoundResponse({ description: 'Conta não encontrada.' })
  @ApiBadRequestResponse({ description: 'Erro de validação ao buscar conta.' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: Express.User,
  ): Promise<BankAccountDto> {
    const bankAccount = await this.bankAccountService.findOne(id, user.id);

    return BankAccountDto.toDto(bankAccount);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.bankAccountService.update(id, updateBankAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return id;
    // return this.bankAccountService.remove(id);
  }
}
