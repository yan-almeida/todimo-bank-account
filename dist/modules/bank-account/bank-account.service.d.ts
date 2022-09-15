import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { FilterBankAccountDto } from './dto/filter-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccount } from './entities/bank-account.entity';
export declare class BankAccountService {
    private readonly bankAccountRepository;
    private readonly userService;
    constructor(bankAccountRepository: Repository<BankAccount>, userService: UserService);
    create(createBankAccountDto: CreateBankAccountDto): Promise<BankAccount>;
    findAll(filterBankAccountDto: FilterBankAccountDto): Promise<BankAccount[]>;
    findOne(id: string): Promise<BankAccount>;
    update(id: string, updateBankAccountDto: UpdateBankAccountDto): string;
    remove(id: string): string;
}
