import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublicRoute';

export const PublicRoute = () =>
  SetMetadata<string, boolean>(IS_PUBLIC_KEY, true);
