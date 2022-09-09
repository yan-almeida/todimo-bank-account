import { Repository } from 'typeorm';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccount } from './entities/bank-account.entity';
export declare class BankAccountService {
    private readonly bankAccountRepository;
    constructor(bankAccountRepository: Repository<BankAccount>);
    create(createBankAccountDto: CreateBankAccountDto): Promise<BankAccount>;
    findAll(): Promise<BankAccount[]>;
    findOne(id: string): Promise<BankAccount>;
    update(id: string, updateBankAccountDto: UpdateBankAccountDto): string;
    remove(id: string): string;
}
