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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ActiveGuard } from 'src/common/guards/active.guard';
import { BankAccountService } from './bank-account.service';
import { BankAccountDto } from './dto/bank-account.dto';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@ApiTags('Bank Account')
@Controller('bank-account')
@UseGuards(ActiveGuard)
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Conta criada com sucesso.',
    type: BankAccountDto,
  })
  @ApiBadRequestResponse({ description: 'Erro de validação ao criar conta.' })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createBankAccountDto: CreateBankAccountDto,
  ): Promise<BankAccountDto> {
    const bankAccount = await this.bankAccountService.create(
      createBankAccountDto,
    );

    return BankAccountDto.toDto(bankAccount);
  }

  @Get()
  @ApiOkResponse({
    description: 'Contas buscadas.',
    type: [BankAccountDto],
  })
  async findAll(): Promise<BankAccountDto[]> {
    const bankAccounts = await this.bankAccountService.findAll();

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
  ): Promise<BankAccountDto> {
    const bankAccount = await this.bankAccountService.findOne(id);

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
