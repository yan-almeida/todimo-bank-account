import { BankAccount } from '../entities/bank-account.entity';
export declare class BankAccountDto {
    id: string;
    accountNumber: string;
    static toDto(bankAccount: BankAccount): BankAccountDto;
}
