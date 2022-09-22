import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptAdapter } from 'src/adapter/encryptation/bcrypt/bcrypt.adapter';
import { Readable, Transform } from 'stream';
import { FindOptionsWhere, Not, Repository } from 'typeorm';
import { BankAccountService } from '../bank-account/bank-account.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => BankAccountService))
    private readonly bankAccountService: BankAccountService,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.validateUserExistsByEmail(createUserDto.email);

    const password = await this.bcryptAdapter.encrypt(createUserDto.password);

    const user = this.userRepository.create({ ...createUserDto, password });

    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  findOneBy(
    where: FindOptionsWhere<User> | FindOptionsWhere<User>[],
  ): Promise<User> {
    return this.userRepository.findOneBy(where);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto?.email) {
      await this.validateEmailAndIdIsNotSameUser(id, updateUserDto.email);
    }

    const updateResult = await this.userRepository.update(id, updateUserDto);

    if (updateResult.affected === 0) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.userRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    const softDeleteResult = await this.userRepository.softDelete(id);

    if (softDeleteResult.affected === 0) {
      // throw new UnprocessableEntityException('Registro não alterado.');
      throw new NotFoundException('Usuário não encontrado.');
    }

    // ao remover um usuário, será necessário DESATIVAR/DELETAR as suas contas bancárias

    await this.bankAccountService.removeByUserId(id);
  }

  private async validateEmailAndIdIsNotSameUser(
    id: string,
    email: string,
  ): Promise<void> {
    const count = await this.userRepository.countBy({
      id: Not(id),
      email,
    });

    if (count > 0) {
      throw new ConflictException('Usuário já cadastrado.');
    }
  }

  private async validateUserExistsByEmail(email: string): Promise<void> {
    const countUsers = await this.userRepository.countBy({
      email,
    });

    if (countUsers > 0) {
      throw new ConflictException('Usuário já cadastrado.');
    }
  }

  async export() {
    let counter = 0;

    const readable = Readable.from(this.generateUserAndBankAccounts());

    const mapToCsv = new Transform({
      transform(chunk, _, callback) {
        const {
          userId,
          userName,
          accountNumber,
          balance,
        }: ExportUserBankAccount = JSON.parse(chunk);

        const result = `${userId},${userName},${accountNumber},${balance}\n`;
        callback(null, result);
      },
    });

    const setHeader = new Transform({
      transform(chunk, _, callback) {
        if (counter) {
          return callback(null, chunk);
        }

        counter++;

        callback(
          null,
          `identificador do usuário,nome completo,número da conta,saldo\n`.concat(
            chunk,
          ),
        );
      },
    });

    return {
      readable,
      mapToCsv,
      setHeader,
    };
  }

  private async *generateUserAndBankAccounts(): AsyncGenerator<
    string,
    void,
    unknown
  > {
    const users = await this.userRepository.find();

    for (const user of users) {
      const bankAccounts = await this.bankAccountService.findBy({
        user: {
          id: user.id,
        },
      });

      for (const { accountNumber, balance } of bankAccounts) {
        const exportUserBankAccount: ExportUserBankAccount = {
          accountNumber,
          balance,
          userId: user.id,
          userName: user.name,
        };

        yield JSON.stringify(exportUserBankAccount);
      }
    }
  }
}

interface ExportUserBankAccount {
  userId: string;
  userName: string;
  accountNumber: string;
  balance: number;
}
