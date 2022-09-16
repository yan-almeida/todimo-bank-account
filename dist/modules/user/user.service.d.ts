import { BcryptAdapter } from 'src/adapter/encryptation/bcrypt/bcrypt.adapter';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BankAccountService } from '../bank-account/bank-account.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly bankAccountService;
    private readonly bcryptAdapter;
    constructor(userRepository: Repository<User>, bankAccountService: BankAccountService, bcryptAdapter: BcryptAdapter);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findOneBy(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    private validateEmailAndIdIsNotSameUser;
    private validateUserExistsByEmail;
}
