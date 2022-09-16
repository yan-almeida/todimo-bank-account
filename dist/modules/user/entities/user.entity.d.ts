import { UniqueIdentifierEntity } from 'src/common/entities/unique-identifier.entity';
import { BankAccount } from 'src/modules/bank-account/entities/bank-account.entity';
export declare class User extends UniqueIdentifierEntity {
    name: string;
    email: string;
    password: string;
    bankAccounts: BankAccount[];
}
