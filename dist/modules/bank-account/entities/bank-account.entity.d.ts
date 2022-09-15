import { User } from 'src/modules/user/entities/user.entity';
export declare class BankAccount {
    id: string;
    balance: number;
    accountNumber: string;
    user: User;
}
