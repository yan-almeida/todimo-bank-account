import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccount } from './entities/bank-account.entity';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private readonly bankAccountRepository: Repository<BankAccount>,
  ) {}

  async create(
    createBankAccountDto: CreateBankAccountDto,
  ): Promise<BankAccount> {
    const bankAccount = this.bankAccountRepository.create(createBankAccountDto);

    return this.bankAccountRepository.save(bankAccount);
  }

  findAll(): Promise<BankAccount[]> {
    /**
     * select * from tb_bank_account
     */
    return this.bankAccountRepository.find();
  }

  async findOne(id: string): Promise<BankAccount> {
    /**
     * select * from tb_bank_account where id = :id
     */
    const bankAccount = await this.bankAccountRepository.findOne({
      where: {
        id,
      },
    });

    if (!bankAccount) {
      throw new NotFoundException('Conta não encontrada.');
    }

    return bankAccount;
  }

  update(id: string, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: string) {
    return `This action removes a #${id} bankAccount`;
  }
}
