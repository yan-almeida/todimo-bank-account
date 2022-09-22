import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { FilterBankAccountDto } from './dto/filter-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccount } from './entities/bank-account.entity';

@Injectable()
export class BankAccountService {
  private readonly logger = new Logger(BankAccountService.name);

  constructor(
    @InjectRepository(BankAccount)
    private readonly bankAccountRepository: Repository<BankAccount>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async create(
    userId: string,
    createBankAccountDto: CreateBankAccountDto,
  ): Promise<BankAccount> {
    const user = await this.userService.findOne(userId);

    // validar contas bancarias - não permitir criar contas bancarias com o mesmo número

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
  async findOne(id: string, userId: string): Promise<BankAccount> {
    const bankAccount = await this.bankAccountRepository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });

    if (!bankAccount) {
      throw new NotFoundException('Conta não encontrada.');
    }

    return bankAccount;
  }

  findBy(
    where: FindOptionsWhere<BankAccount> | FindOptionsWhere<BankAccount>[],
  ) {
    return this.bankAccountRepository.findBy(where);
  }

  update(id: string, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: string) {
    return `This action removes a #${id} bankAccount`;
  }

  async removeByUserId(userId: string) {
    this.logger.debug(`removendo contas bancárias - [userId][${userId}]`);

    const deleteResult = await this.bankAccountRepository.delete({
      user: {
        id: userId,
      },
    });

    if (deleteResult.affected === 0) {
      this.logger.log(`erro ao remover contas bancárias - [userId][${userId}]`);

      throw new UnprocessableEntityException('Usuário possui contas ativas.');
    }

    this.logger.debug(
      `contas bancárias removidas com sucesso - [userId][${userId}]`,
    );
  }
}
