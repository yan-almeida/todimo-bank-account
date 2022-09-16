import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<UserDto>;
    findAll(): Promise<UserDto[]>;
    findOne(id: string): Promise<UserDto>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto>;
    remove(id: string): Promise<void>;
}
