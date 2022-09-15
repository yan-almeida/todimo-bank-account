import { User } from '../entities/user.entity';
export declare class UserDto {
    id: string;
    name: string;
    email: string;
    static from(user: User): UserDto;
}
