import { BankAccountService } from './bank-account.service';
import { BankAccountDto } from './dto/bank-account.dto';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { FilterBankAccountDto } from './dto/filter-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
export declare class BankAccountController {
    private readonly bankAccountService;
    constructor(bankAccountService: BankAccountService);
    create(createBankAccountDto: CreateBankAccountDto): Promise<BankAccountDto>;
    findAll(filterBankAccountDto: FilterBankAccountDto): Promise<BankAccountDto[]>;
    findOne(id: string): Promise<BankAccountDto>;
    update(id: string, updateBankAccountDto: UpdateBankAccountDto): string;
    remove(id: number): number;
}
