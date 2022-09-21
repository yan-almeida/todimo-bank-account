import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface LoggerUser {
  userId: string;
  name: string;
}

export const User = createParamDecorator(
  (_: unknown, context: ExecutionContext): Express.User => {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    if (request.user) {
      const { id } = request.user;

      return {
        id,
      };
    }
  },
);
