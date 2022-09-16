import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptAdapter } from 'src/adapter/encryptation/bcrypt/bcrypt.adapter';
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
}
