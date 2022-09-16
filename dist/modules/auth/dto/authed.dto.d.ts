import { User } from 'src/modules/user/entities/user.entity';
export declare class AuthedDto {
    userId: string;
    token: string;
    static toDto(token: string, user: User): AuthedDto;
}
