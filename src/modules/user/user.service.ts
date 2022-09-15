import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // adicionar BankAccountService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.validateUserExistsByEmail(createUserDto.email);

    const user = this.userRepository.create(createUserDto);

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

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto?.email) {
      await this.validateUserExistsByEmail(updateUserDto.email);
    }

    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    const softDeleteResult = await this.userRepository.softDelete(id);

    // ao remover um usuário, será necessário DESATIVAR/DELETAR as suas contas bancárias

    if (softDeleteResult.affected === 0) {
      // throw new UnprocessableEntityException('Registro não alterado.');
      throw new NotFoundException('Usuário não encontrado.');
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
