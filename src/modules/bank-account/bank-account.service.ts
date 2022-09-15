import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { FilterBankAccountDto } from './dto/filter-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccount } from './entities/bank-account.entity';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private readonly bankAccountRepository: Repository<BankAccount>,
    private readonly userService: UserService,
  ) {}

  async create(
    createBankAccountDto: CreateBankAccountDto,
  ): Promise<BankAccount> {
    const user = await this.userService.findOne(createBankAccountDto.userId);

    const bankAccount = this.bankAccountRepository.create({
      ...createBankAccountDto,
      user,
    });

    return this.bankAccountRepository.save(bankAccount);
  }

  /**
   * caso o id do usuário **não seja** passado:
   *
   * `select * from tb_bank_account;`
   *
   * ---------------------------------------
   *
   * caso o id do usuário **seja** passado:
   *
   * `select * from tb_bank_account where user_id = :userId;`
   *
   * ---------------------------------------
   *
   * caso assinemos a propriedade **relations** (`relations: ['user']`):
   *
   * `select * from tb_bank_account ba left join tb_user u on ba.user_id = u.id;`
   */
  findAll(filterBankAccountDto: FilterBankAccountDto): Promise<BankAccount[]> {
    return this.bankAccountRepository.find({
      where: {
        user: {
          id: filterBankAccountDto?.userId,
        },
      },
      // relations: ['user'],
    });
  }

  /**
   * select * from tb_bank_account where id = :id
   */
  async findOne(id: string): Promise<BankAccount> {
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
