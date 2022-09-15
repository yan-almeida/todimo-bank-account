import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class ActiveGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
