import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import {
  JwtAuthGuard,
  PermissionGuard,
} from 'src/modules/authentications/guards';
import { PERMISSION_KEY } from 'src/common/constants';

export const Permissions = (...permissions: string[]) => {
  return applyDecorators(
    SetMetadata(PERMISSION_KEY, permissions),
    UseGuards(JwtAuthGuard, PermissionGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
};
