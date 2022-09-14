import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

/**
 * Caso seja um valor verdadeiro (true), o recurso estará disponivel.
 *
 * E, caso seja um valor falso (false), a aplicação retornará uma EXCEÇÃO
 * geralmente, por padrão, um forbidden (403).
 */
@Injectable()
export class ActiveGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log(context.getHandler());

    return true;
  }
}
